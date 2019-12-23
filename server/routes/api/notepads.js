import express from "express";
import passport from "passport";

const router = express.Router();

// Load NotePad schema
import Note from "../../models/Note";
import Notepad from "../../models/Notepad";
import User from "../../models/User";

// HTTP Status Codes
import statusCodes from "../../constants/statusCodes";

import ObjectId from "../../util/toObjectId";

import {
  validateNotepadCreation,
  validateNotepadModification
} from "../../validation/notepad";

/**
 * @operation GET
 * @route     api/notepads/tests
 * @desc      Test notepads route
 */
router.get("/test", (_req, res) => res.json({ msg: "NotePads API Works" }));

/**
 * @operation POST
 * @route     api/notepads/create
 * @desc      Creates a new notepad
 */
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateNotepadCreation(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(statusCodes.BADREQUEST).json(errors);
    }

    const newNotepadData = {
      userId: req.user.id
    };

    if (req.body.title !== "") {
      newNotepadData.title = req.body.title;
    }
    if (req.body.description !== "") {
      newNotepadData.description = req.body.description;
    }

    const newNotepad = new Notepad(newNotepadData);
    newNotepad
      .save()
      .then(notepad => {
        // Add notepad id to user
        User.findOneAndUpdate(
          { _id: req.user.id },
          { $push: { notepads: ObjectId(notepad._id) } }
        ).catch(err => {
          notepad.remove();
          return res
            .status(statusCodes.BADREQUEST)
            .json({ err: "An error has occured when creating notepad" });
        });

        return res.json(notepad);
      })
      .catch(err => {
        newNotepad.remove();
        return res.status(statusCodes.BADREQUEST).json(err);
      });
  }
);

/**
 * @operation POST
 * @route     api/notepads/modify
 * @desc      Modifies the notepad's title, description, dueDate, or status
 */
router.post(
  "/modify",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateNotepadModification(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(statusCodes.BADREQUEST).json(errors);
    }

    Notepad.findById(req.body.notepadId)
      .then(notepad => {
        notepad.title = req.body.title || notepad.title;
        notepad.description = req.body.description || notepad.description;
        notepad.public = req.body.public || notepad.public;

        notepad
          .save()
          .then(savedNotepad => {
            res.json(savedNotepad);
          })
          .catch(_err =>
            res
              .status(statusCodes.BADREQUEST)
              .json({ err: "There was an issue modifying the notepad." })
          );
      })
      .catch(_err =>
        res
          .status(statusCodes.NOTFOUND)
          .json({ err: "Could not find the notepad" })
      );
  }
);

/**
 * @operation POST
 * @route     api/notepads/delete
 * @desc      Deletes a notepad if the user owns it
 */
router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Notepad.findById(req.body.notepadId)
      .then(notepad => {
        notepad
          .remove()
          .then(() => {
            res.json({ Success: "Notepad successfully deleted." });
          })
          .catch(_err =>
            res
              .status(statusCodes.BADREQUEST)
              .json({ err: "There was an issue deleting the notepad." })
          );
      })
      .catch(_err =>
        res
          .status(statusCodes.NOTFOUND)
          .json({ err: "Could not find the notepad" })
      );
  }
);

/**
 * @operation GET
 * @route     api/notepads/all
 * @desc      Gets all the notepads that the user has ever created
 */
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Notepad.find({ userId: req.user.id })
      .then(notepads => {
        // Store notepad into object
        const notepadData = {};

        notepads.forEach(notepad => {
          notepadData[notepad._id] = {
            id: notepad._id,
            title: notepad.title,
            description: notepad.description,
            noteIds: notepad.noteIds,
            notes: {}
          };
        });

        return res.json(notepadData);
      })
      .catch(err => res.status(statusCodes.BADREQUEST).json(err));
  }
);

/**
 * @operation GET
 * @route     api/notepads/:notepadId
 * @desc      Gets information about the notepad if it is public or user owns the note
 *
 * @note      MUST BE UNDER /all because it will see "all" as a notepadId
 */
router.get("/:notepadId", (req, res) => {
  Notepad.findById(req.params.notepadId)
    .then(notepad => {
      return notepad.public
        ? res.json(notepad)
        : res.status(statusCodes.UNAUTHORIZED);
    })
    .catch(err => res.status(statusCodes.NOTFOUND).json(err));
});

export default router;
