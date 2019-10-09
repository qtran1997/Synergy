import express from "express";
import passport from "passport";

const router = express.Router();

// Load NotePad schema
import Notepad from "../../models/Notepad";

// HTTP Status Codes
import statusCodes from "../../constants/statusCodes";

import validateNoteModification from "../../validation/notepad";

/**
 * @operation GET
 * @route     api/notepads/tests
 * @desc      Test notepads route
 */
router.get("/test", (req, res) => res.json({ msg: "NotePads API Works" }));

//TODO

/**
 * @operation POST
 * @route     api/notepads/create
 * @desc      Creates a new notepad
 */
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newNotepad = new Notepad({
      userId: req.user.id
    });

    newNotepad
      .save()
      .then(notepad => res.json(notepad))
      .catch(err => res.status(statusCodes.BADREQUEST).json(err));
  }
);

/**
 * @operation POST
 * @route     api/notepad/modify/:notepadId
 * @desc      Modifies the notepad's title, description, dueDate, or status
 */

/**
 * @operation POST
 * @route     api/notepad/delete/:notepadId
 * @desc      Deletes a notepad if the user owns it
 */

/**
 * @operation GET
 * @route     api/notepad/:notepadId
 * @desc      Gets information about the notepad if it is public or user owns the note
 */
router.get("/:notepadId", (req, res) => {
  Notepad.findById(req.params.notepadId)
    .then(notepad => {
      res.json(notepad);
    })
    .catch(err => res.status(statusCodes.NOTFOUND).json(err));
});

/**
 * @operation GET
 * @route     api/notepad/all
 * @desc      Gets all the notepads that the user has ever created
 */

export default router;
