import express from "express";
import passport from "passport";

const router = express.Router();

// Load Note schema
import Note from "../../models/Note";
// Load Notepad schema
import Notepad from "../../models/Notepad";

// HTTP Status Codes
import statusCodes from "../../constants/statusCodes";

import {
  validateNoteCreation,
  validateNoteModification
} from "../../validation/note";

/**
 * @operation GET
 * @route     api/notes/tests
 * @desc      Test notes route
 */
router.get("/test", (_req, res) => res.json({ msg: "Notes API Works" }));

/**
 * @operation POST
 * @route     api/notes/create
 * @desc      Create a public or private note for the user
 */
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateNoteCreation(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(statusCodes.BADREQUEST).json(errors);
    }

    // Check if the notepad exists
    Notepad.findById(req.body.notepadId)
      .then(notepad => {
        const newNote = new Note({
          notepadId: req.body.notepadId,
          userId: req.user.id
        });

        newNote
          .save()
          .then(note => {
            // Add note to notepad
            notepad.noteIds.push(note.id);
            notepad
              .save()
              .then(_notepad => res.json(note))
              .catch(_err => {
                newNote.remove();
                return res
                  .status(statusCodes.BADREQUEST)
                  .json({ err: "Fatal error. Could not add note to notepad." });
              });
          })
          .catch(_err =>
            res
              .status(statusCodes.BADREQUEST)
              .json({ err: "There was an issue saving the note" })
          );
      })
      .catch(_err =>
        res.status(statusCodes.BADREQUEST).json({
          err: "Fatal error. Creating a note to a notepad that is not found"
        })
      );
  }
);

/**
 * @operation POST
 * @route     api/notes/modify
 * @desc      Modifies the note's title, description, dueDate, or status
 */
router.post(
  "/modify",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateNoteModification(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(statusCodes.BADREQUEST).json(errors);
    }

    Note.findById(req.body.noteId)
      .then(note => {
        note.title = req.body.title || note.title;
        note.description = req.body.description || note.description;
        note.done = req.body.done || note.done;
        note.dueDate = req.body.dueDate
          ? new Date(req.body.dueDate)
          : note.dueDate;

        note
          .save()
          .then(savedNote => {
            res.json(savedNote);
          })
          .catch(_err =>
            res
              .status(statusCodes.BADREQUEST)
              .json({ err: "There was an issue modifying the note." })
          );
      })
      .catch(_err =>
        res
          .status(statusCodes.NOTFOUND)
          .json({ err: "Could not find the note" })
      );
  }
);

/**
 * @operation POST
 * @route     api/notes/delete
 * @desc      Deletes a note if the user owns it
 */
router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Note.findById(req.body.noteId)
      .then(note => {
        note
          .remove()
          .then(() => {
            res.json({ Success: "Note successfully deleted." });
          })
          .catch(_err =>
            res
              .status(statusCodes.BADREQUEST)
              .json({ err: "There was an issue deleting the note." })
          );
      })
      .catch(_err =>
        res
          .status(statusCodes.NOTFOUND)
          .json({ err: "Could not find the note" })
      );
  }
);

/**
 * @operation GET
 * @route     api/notes/all
 * @desc      Gets all the notes that the user has ever created
 */
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Note.find({ userId: ObjectId(req.user.id) })
      .then(note => {
        res.json(note);
      })
      .catch(err => res.status(statusCodes.BADREQUEST).json(err));
  }
);

/**
 * @operation GET
 * @route     api/notes/:noteId
 * @desc      Gets information about the note if it is public or user owns the note
 *
 * @note      MUST BE UNDER /all because it will see "all" as a note
 */
router.get("/:noteId", (req, res) => {
  Note.findById(req.params.noteId)
    .then(note => {
      return note.public
        ? res.json(note)
        : res.status(statusCodes.UNAUTHORIZED);
    })
    .catch(err => res.status(statusCodes.NOTFOUND).json(err));
});

export default router;
