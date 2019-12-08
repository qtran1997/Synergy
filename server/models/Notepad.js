import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NotepadSchema = new Schema(
  {
    // Belongs to this user
    userId: {
      type: Schema.Types.ObjectId,
      ref: `users`
    },
    public: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: "New Notepad"
    },
    description: {
      type: String,
      default: "Description"
    },
    noteIds: {
      type: [Schema.Types.ObjectId],
      ref: "notes",
      default: []
    }
  },
  { timestamps: true }
);

// Creates schema in the database
const Notepad = mongoose.model("notepads", NotepadSchema);

export default Notepad;
