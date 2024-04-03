const express = require("express");
const router = express.Router();

const {
  seedPosts,
  getAllPosts,
  getUserPosts,
  addNewPost,
  deletePost,
  updatePost,
} = require("../controllers/posts");

router.get("/posts/seed", seedPosts);
router.get("/posts", getAllPosts);
router.get("/:id/posts", getUserPosts);
router.put("/posts", addNewPost);
router.delete("/:id/posts", deletePost)
router.post("/:id/posts",updatePost)

module.exports = router;
