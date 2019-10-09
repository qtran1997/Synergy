import express from "express";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { dbKey } from "../../config/keys";
import passport from "passport";

// HTTP Status Codes
import statusCodes from "../../constants/statusCodes";

// Load Input Validation
import validateRegisterInput from "../../validation/register";
import validateLoginInput from "../../validation/login";

// Load User schema
import User from "../../models/User";

const router = express.Router();

// @route   GET api/users/tests
// @desc    Test users route
router.get("/test", (req, res) => res.json({ msg: "Users API Works" }));

// @route   POST api/users/register
// @desc    Register user
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(statusCodes.BADREQUEST).json(errors);
  }

  User.findOne({
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
              .catch(err => res.json(err));
          });
        });
      }
    })
    .catch(err => console.log(err));
});

// @route   POST api/users/login
// @desc    Login users
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
    .catch(err => console.log(err));
});

// @route   GET api/users/current
// @desc    Return current user
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

export default router;
