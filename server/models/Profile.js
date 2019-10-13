import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  // Belongs to this user
  userId: {
    type: Schema.Types.ObjectId,
    ref: `users`
  },
  username: {
    type: String,
    ref: `users`
  },
  dateJoined: {
    type: Date,
    ref: "users"
  }
});

// Creates schema in the database
const Profile = mongoose.model("profiles", ProfileSchema);

export default Profile;
