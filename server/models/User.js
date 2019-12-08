import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema(
  {
    username: {
      type: String,
      require: true
    },
    fname: {
      type: String,
      require: true
    },
    lname: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    },
    avatar: {
      type: String
    },
    friends: [{ type: Schema.Types.ObjectId, ref: "friends" }],
    notepads: [{ type: Schema.Types.ObjectId, ref: "notepads" }]
  },
  { timestamps: true }
);

// Creates schema in the database
const User = mongoose.model("users", UserSchema);

export default User;
