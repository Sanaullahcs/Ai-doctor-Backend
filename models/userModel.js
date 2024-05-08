import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Profile = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // phone: {
  //   type: String,
  //   required: true,
  // },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("users", Profile);
