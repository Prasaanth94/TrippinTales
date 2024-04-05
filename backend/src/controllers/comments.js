const PostsModel = require("../models/Posts");

const getCommentByPostId = async (req, res) => {
  try {
    const post = await PostsModel.findOne({ comments: req.params.post_id });
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error getting comment from post" });
  }
}; //WIP, trying to get it working

const addCommentToPost = async (req, res) => {
  try {
    const postId = req.body.postId;
    const userId = req.body.userId;

    const post = await PostsModel.findById(postId);
    if (!post) {
      return res.status(404).json({ status: "error", msg: "post not found" });
    }

    const newComment = {
      user_id: userId,
      post_id: postId,
      content: req.body.content,
    };

    post.comments.push(newComment);
    await post.save();
    res.json({ status: "ok", msg: "comment added", newComment });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "failed to add comment" });
  }
}; //confirmed working, will be added to post -> comments

module.exports = {
  getCommentByPostId,
  addCommentToPost,
};

//addCommentToPost,deleteComment
