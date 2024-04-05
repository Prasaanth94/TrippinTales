const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    content: { type: String, required: true, minLength: 1, maxLength: 1000 },
    created_at: { type: Date, default: Date.now },
  },
  { collection: "comments" }
);

module.exports = CommentsSchema; //exporting as a sub-document rather than an actual Schema
