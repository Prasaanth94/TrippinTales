const express = require("express");
const router = express.Router();
const {
  getCommentByPostId,
  addCommentToPost,
  deleteCommentFromPost,
} = require("../controllers/comments");

router.get("/comments", getCommentByPostId);
router.put("/comments", addCommentToPost);
router.delete("/comments", deleteCommentFromPost);

module.exports = router;
