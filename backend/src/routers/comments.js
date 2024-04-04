const express = require("express");
const router = express.Router();
const {
  getAllComments,
  getCommentByPostId,
} = require("../controllers/comments");

router.get("/comments", getAllComments);
router.get("/comments/:id", getCommentByPostId);

module.exports = router;
