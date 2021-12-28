const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String },
  image: { type: String },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
  ],
  unilikes: [{ type: mongoose.Types.ObjectId, required: true, ref: "User" }],
});

// uniqueValidator(postSchema);

module.exports = mongoose.model("Post", postSchema);
