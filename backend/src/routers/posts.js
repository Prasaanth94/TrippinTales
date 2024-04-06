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

const { authUser, authAdmin } = require("../middleware/auth");
const { validateBodyInPost } = require("../validators/posts");
const { errorCheck } = require("../validators/errorCheck");

router.get("/posts/seed", authAdmin, seedPosts);
router.get("/posts", authAdmin, getAllPosts);
router.get("/:user_id/posts", authUser, getUserPosts);
router.put("/posts", authUser, validateBodyInPost, errorCheck, addNewPost);
router.delete("/posts/:id", authUser, deletePost);
router.patch("/posts/:id", authUser, updatePost);

module.exports = router;
