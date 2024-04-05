const express = require("express");
const router = express.Router();
const {
  getCommentByPostId,
  addCommentToPost,
  deleteCommentFromPost,
} = require("../controllers/comments");

router.get("/comments/", getCommentByPostId);
router.put("/add-comment", addCommentToPost);
router.delete("/delete-comment", deleteCommentFromPost);

module.exports = router;
