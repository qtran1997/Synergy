import express from "express";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { dbKey } from "../../config/keys";
import passport from "passport";

// HTTP Status Codes
import statusCodes from "../../constants/statusCodes";

// Load Input Validation
import validateRegisterInput from "../../validation/user/register";
import validateLoginInput from "../../validation/user/login";
import validateModifyUserSettingsInput from "../../validation/user/settings";

// Load User schema
import User from "../../models/User";

const router = express.Router();

/**
 * @operation GET
 * @route     api/users/tests
 * @desc      Test users route
 */
router.get("/test", (_req, res) => res.json({ msg: "Users API Works" }));

/**
 * @operation POST
 * @route     api/users/register
 * @desc      Register users
 */
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(statusCodes.BADREQUEST).json(errors);
  }

  User.find({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  })
    .then(user => {
      if (user) {
        user.forEach(user => {
          if (user.email == req.body.email)
            errors.email = "Email already exists";
          if (user.username == req.body.username)
            errors.username = "Username already exists";
        });

        return res.status(statusCodes.BADREQUEST).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200", //SIZE
          r: "pg", //Rating
          d: "mm" //Default
        });

        const newUser = new User({
          username: req.body.username.trim(),
          fname: req.body.fname.trim(),
          lname: req.body.lname.trim(),
          email: req.body.email.trim(),
          avatar,
          password: req.body.password.trim()
        });

        bcrypt.genSalt(10, (_err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => res.status(statusCodes.BADREQUEST).json(err));
          });
        });
      }
    })
    .catch(err =>
      res.status(statusCodes.BADREQUEST).json({ err: "User already exists." })
    );
});

/**
 * @operation POST
 * @route     api/users/login
 * @desc      Login users
 */
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(statusCodes.BADREQUEST).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;
  // Find user by username
  User.findOne({ username: { $regex: new RegExp(username, "i") } })
    .then(user => {
      // Check for user
      if (!user) {
        errors.username = "User not found";
        return res.status(statusCodes.NOTFOUND).json(errors);
      }

      // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            username: user.username,
            fname: user.fname,
            lname: user.lname,
            avatar: user.avatar
          };

          // Sign Token
          jsonwebtoken.sign(
            payload,
            dbKey.secretOrKey,
            { expiresIn: 3600 },
            (_err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          errors.password = "Password incorrect";
          return res.status(statusCodes.BADREQUEST).json(errors);
        }
      });
    })
    .catch(err =>
      res.status(statusCodes.NOTFOUND).json({ err: "User not found" })
    );
});

/**
 * @operation POST
 * @route     api/users/modify
 * @desc      Modify current user settings
 */
router.post(
  "/modify",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateModifyUserSettingsInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(statusCodes.BADREQUEST).json(errors);
    }

    User.findById(req.user.id)
      .then(user => {
        user.username = req.body.username
          ? req.body.username.trim()
          : user.username;
        user.fname = req.body.fname ? req.body.fname.trim() : user.fname;
        user.lname = req.body.lname ? req.body.lname.trim() : user.lname;
        user.email = req.body.email ? req.body.email.trim() : user.email;

        // If password is being changed, hash it
        if (req.body.password) {
          bcrypt.genSalt(10, (_err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
              if (err) throw err;
              user.password = hash;
              user
                .save()
                .then(user => res.json(user))
                .catch(err => res.status(statusCodes.BADREQUEST).json(err));
            });
          });
        }

        user
          .save()
          .then(user => res.json(user))
          .catch(err => res.status(statusCodes.BADREQUEST).json(err));
      })
      .catch(err =>
        res.status(statusCodes.NOTFOUND).json({ err: "User not found" })
      );
  }
);

/**
 * @operation GET
 * @route     api/users/current
 * @desc      Return current user
 */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      fname: req.user.fname,
      lname: req.user.lname,
      email: req.body.email
    });
  }
);

/**
 * @operation GET
 * @route     api/users/:userId
 * @desc      Return user's information
 */
router.get("/:userId", (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      res.json({
        id: user.id,
        username: user.username,
        fname: user.fname,
        lname: user.lname,
        email: user.email
      });
    })
    .catch(err =>
      res.status(statusCodes.NOTFOUND).json({ err: "User not found" })
    );
});

export default router;
