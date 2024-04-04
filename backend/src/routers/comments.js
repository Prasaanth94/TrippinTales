const express = require("express");
const router = express.Router();
const {
  getAllComments,
  getCommentByPostId,
  addCommentToPost,
} = require("../controllers/comments");

router.get("/comments", getAllComments);
router.get("/comments/:id", getCommentByPostId);
router.get("/comments", addCommentToPost);

module.exports = router;
