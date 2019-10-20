import mongoose from "mongoose";

import friendStatus from "../constants/friendStatus";

const Schema = mongoose.Schema;

// Create Schema
const FriendsSchema = new Schema(
  {
    requester: { type: Schema.Types.ObjectId, ref: "users" },
    recipient: { type: Schema.Types.ObjectId, ref: "users" },
    status: {
      type: Number,
      enums: [
        friendStatus.AddFriend, // Add Friend - No request sent
        friendStatus.Requested, // Requested - Initial Request
        friendStatus.Pending, // Pending
        friendStatus.Friends // Friends
      ],
      default: friendStatus.AddFriend
    }
  },
  { timestamps: true }
);

// Creates schema in the database
const Friend = mongoose.model("friends", FriendsSchema);

export default Friend;
