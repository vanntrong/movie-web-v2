const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    author: {
      userId: String,
      name: String,
      avatar: String,
    },
    content: {
      type: String,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    dislikeCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
