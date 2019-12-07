import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NoteSchema = new Schema(
  {
    // Belongs to this notepad
    notepadId: {
      type: Schema.Types.ObjectId,
      ref: "notepads"
    },
    // Belongs to this user
    userId: {
      type: Schema.Types.ObjectId,
      ref: `users`
    },
    title: {
      type: String,
      default: "New Note"
    },
    description: {
      type: String,
      default: "Description"
    },
    dueDate: {
      type: Date
    },
    done: {
      type: Boolean,
      default: false
    },
    position: {
      x: {
        type: Number,
        default: 15
      },
      y: {
        type: Number,
        default: 15
      }
    }
  },
  { timestamps: true }
);

// Creates schema in the database
const Note = mongoose.model("notes", NoteSchema);

export default Note;
