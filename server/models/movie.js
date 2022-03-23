const mongoose = require("mongoose");
const Comment = require("./comment").schema;

const movieSchema = new mongoose.Schema(
  {
    mediaType: {
      type: String,
      enum: ["movie", "tv"],
      required: true,
    },
    idMovie: {
      type: Number,
      required: true,
    },
    comments: {
      type: [Comment],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
