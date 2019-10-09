import express from "express";
import passport from "passport";

const router = express.Router();

// Load Note schema
import Note from "../../models/Note";
// Load Notepad schema
import Notepad from "../../models/Notepad";

// HTTP Status Codes
import statusCodes from "../../constants/statusCodes";

import validateNoteModification from "../../validation/note";

/**
 * @operation GET
 * @route     api/notes/tests
 * @desc      Test notes route
 */
router.get("/test", (req, res) => res.json({ msg: "Notes API Works" }));

//TODO

/**
 * @operation POST
 * @route     api/notes/create
 * @desc      Create a public or private note for the user
 */
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
 * @route     api/notes/modify/:noteId
 * @desc      Modifies the note's title, description, dueDate, or status
 */
router.post(
  "/modify/:noteId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newNote = new Note({
      notepadId: req.body.notepadId,
      userId: req.user.id,
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate || null
    });

    newNote
      .save()
      .then(note => {
        Notepad.findById(req.body.notepadId)
          .then(notepad => {
            notepad.notes.push(note.id);
            notepad
              .save()
              .then(_notepad => res.json(note))
              .catch(_err => {
                newNote.remove();
                return res.status(statusCodes.BADREQUEST).json({
                  err: "Fatal error. Could not add note to notepad."
                });
              });
          })
          .catch(_err =>
            res.status(statusCodes.BADREQUEST).json({
              err: "Fatal error. Creating a note to a notepad that is not found"
            })
          );
      })
      .catch(err => res.status(statusCodes.BADREQUEST).json(err));
  }
);

/**
 * @operation POST
 * @route     api/notes/delete/:noteId
 * @desc      Deletes a note if the user owns it
 */

/**
 * @operation GET
 * @route     api/notes/:noteId
 * @desc      Gets information about the note if it is public or user owns the note
 */

/**
 * @operation GET
 * @route     api/notes/all
 * @desc      Gets all the notes that the user has ever created
 */

export default router;
