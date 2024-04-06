const mongoose = require("mongoose");
const CommentsSchema = require("./Comments");

const PostsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minLength: 1, maxLength: 50 },
    content: { type: String, required: true, minLength: 1, maxLength: 5000 },
    user_id: {
      type: String,
      required: true,
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "Users",
    },

    created_at: {
      type: Date,
      default: () => {
        Date.now();
      },
    },

    updated_at: {
      type: Date,
      default: () => {
        Date.now();
      },
    },
    url: { type: String, defualt: "" },
    slug: { type: String, default: "" },
    tags: { type: String, default: "", maxLength: 12 },
    images: { type: String, default: "" },
    meta_description: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 200,
    },
    comments: [CommentsSchema], // Using the schema directly as a subdocument
  },
  { collection: "posts" }
);

module.exports = mongoose.model("Posts", PostsSchema);
