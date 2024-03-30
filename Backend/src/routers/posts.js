const express = require("express");

const { seedPosts, getAllPosts } = require("../controllers/posts");

const router = express.Router();

router.get("/posts/seed", seedPosts);
router.get("/posts", getAllPosts);

module.exports = router;
