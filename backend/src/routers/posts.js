const express = require("express");
const router = express.Router();

const {
  seedPosts,
  getAllPosts,
  getUserPosts,
  addNewPost,
} = require("../controllers/posts");

router.get("/posts/seed", seedPosts);
router.get("/posts", getAllPosts);
router.get("/:id/posts", getUserPosts);
router.put("/posts", addNewPost);

module.exports = router;
