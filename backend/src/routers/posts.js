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
router.get("/:user_id/posts", getUserPosts);
router.put("/posts", addNewPost);
router.delete("/posts/:id", deletePost);
router.patch("/posts/:id", updatePost);

module.exports = router;
