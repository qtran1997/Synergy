const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
// const passport = require("passport");

// @route   GET api/test
// @desc    Test get route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "API GET request works." }));

module.exports = router;
