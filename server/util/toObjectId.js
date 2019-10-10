import mongoose from "mongoose";

const ObjectId = id => {
  return mongoose.Types.ObjectId(id);
};

export default ObjectId;
