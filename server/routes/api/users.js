const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// HTTP Status Codes
const statusCodes = require("../../constants/statusCodes");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User schema
const User = require("../../schemas/User");

// @route   GET api/users/tests
// @desc    Test users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users API Works" }));

// @route   POST api/users/register
// @desc    Register users
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
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

        return res.status(400).json(errors);
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

        bcrypt.genSalt(10, (err, salt) => {
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
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;
  // Find user by username
  User.findOne({ username: { $regex: new RegExp(username, "i") } })
    .then(user => {
      // Check for user
      if (!user) {
        errors.username = "User not found";
        return res.status(404).json(errors);
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
          jwt.sign(
            payload,
            keys.secretOrKey,
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
          return res.status(401).json(errors);
        }
      });
    })
    .catch(err => console.log(err));
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
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

module.exports = router;
