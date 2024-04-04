const CommentsModel = require("../models/Comments");

const getAllComments = async (req, res) => {
  try {
    const allComments = await CommentsModel.find();
    res.json(allComments);
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error getting all comments" });
  }
};

const getCommentByPostId = async (req, res) => {
  try {
    const comment = await CommentsModel.find({ post_id: req.body.post_id });
    res.json(comment);
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error getting comment from post" });
  }
}; //WIP, need to figure how to link to post.. may need to use comments schema as a subcomponent for posts schema

const addCommentToPost = async (req, res) => {
  try {
    const postId = req.body.postId;
    const post = await PostsModel.findById(postId);
    const newComment = {
      content: req.body.content,
      postId: postId,
    };
    await CommentsModel.create(newComment);

    post.comments.push(createdComment._id); //possibly push into an array then map on react?
    await post.save();
    res.json({ status: "ok", msg: "comment added", newComment });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "failed to add comment" });
  }
}; //WIP

module.exports = {
  getAllComments,
  getCommentByPostId,
  addCommentToPost,
};

//addCommentToPost,deleteComment
