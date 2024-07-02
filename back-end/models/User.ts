import mongoose from "mongoose";

const schema = new mongoose.Schema({
  username: {
    type: String,
    required : true
  },
  email: {
    type: String,
    required: true,
    unique : true,
  },
  password: {
    type: String,
    required: true,
  },
  role : {
    type : String,
    required : true,
    default : "user" // enum admin and user
  }

},{timestamps : true});

const User = mongoose.models.user || mongoose.model("user", schema);

export default User;














