import express from "express";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { dbKey } from "../../config/keys";
import passport from "passport";

// HTTP Status Codes
import statusCodes from "../../constants/statusCodes";

// Load Profile schema
import Profile from "../../models/Profile";

const router = express.Router();

/**
 * @operation GET
 * @route     api/profiles/tests
 * @desc      Test profiles route
 */
router.get("/test", (_req, res) => res.json({ msg: "Profiles API Works" }));

/**
 * @operation GET
 * @route     api/profiles/current
 * @desc      Return current user
 */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.find({ userId: req.user.id })
      .then(profile => {
        res.json(profile);
      })
      .catch(err => res.status(statusCodes.NOTFOUND).json(err));
  }
);

/**
 * @operation GET
 * @route     api/profiles/:userId
 * @desc      Return user's information
 */
router.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.find({ userId: req.user.id })
      .then(profile => {
        res.json(profile);
      })
      .catch(err => res.status(statusCodes.NOTFOUND).json(err));
  }
);

export default router;
