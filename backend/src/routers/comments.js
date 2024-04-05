const express = require("express");
const router = express.Router();
const {
  getCommentByPostId,
  addCommentToPost,
} = require("../controllers/comments");

router.get("/comments/:id", getCommentByPostId);
router.put("/add-comment", addCommentToPost);

module.exports = router;
