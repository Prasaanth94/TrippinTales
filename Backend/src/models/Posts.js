const mongoose = require("mongoose");

const PostsSchema = new mongoose.Schema(
  {
    title: { type: String, require: true, minLength: 1, maxLength: 50 },
    content: { type: String, require: true, minLength: 1, maxLength: 50 },
    user_id: { type: String, require: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    url: { type: String, require: true },
    slug: { type: String, require: true },
    tags: { type: String, require: true },
    images: { type: String, require: true },
    meta_description: { type: String, require: true },
  },
  { collection: "posts" }
);

module.exports = mongoose.model("Posts", PostsSchema);
