const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  posts: [{ type: mongoose.Types.ObjectId, required: true, ref: "Post" }],
  followers: [{ type: mongoose.Types.ObjectId, required: true, ref: "User" }],
  follows: [{ type: mongoose.Types.ObjectId, required: true, ref: "User" }],
  liked: [{ type: mongoose.Types.ObjectId, required: true, ref: "Post" }],
});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
