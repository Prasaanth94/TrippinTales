const PostsModel = require("../models/Posts");

const getCommentByPostId = async (req, res) => {
  try {
    const postId = req.body.postId;

    const post = await PostsModel.findById(postId);

    if (!post) {
      return res.status(404).json({ status: "error", msg: "Post not found" });
    }

    const comments = post.comments;

    res.json(comments);
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "Error getting comments from post" });
  }
};

const addCommentToPost = async (req, res) => {
  try {
    const postId = req.body.postId;
    const userId = req.body.userId;
    const username = req.body.username;

    const post = await PostsModel.findById(postId);
    if (!post) {
      return res.status(404).json({ status: "error", msg: "post not found" });
    }

    const newComment = {
      user_id: userId,
      post_id: postId,
      content: req.body.content,
      username: username,
    };

    const commentTime = new Date();
    commentTime.setHours(commentTime.getHours() + 8); // UTC +8
    newComment.created_at = commentTime;

    post.comments.push(newComment);
    await post.save();
    res.json({ status: "ok", msg: "comment added", newComment });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "failed to add comment" });
  }
};

const deleteCommentFromPost = async (req, res) => {
  try {
    const commentId = req.body._id;
    const post = await PostsModel.findOne({ "comments._id": commentId });

    if (!post) {
      return res.status(404).json({
        status: "error",
        msg: "comment not found",
      });
    }

    post.comments.pull(commentId);

    await post.save();

    res.json({ status: "ok", msg: "Comment deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Failed to delete comment" });
  }
};

module.exports = {
  getCommentByPostId,
  addCommentToPost,
  deleteCommentFromPost,
};
