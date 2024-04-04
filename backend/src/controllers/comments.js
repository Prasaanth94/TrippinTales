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
};

module.exports = {
  getAllComments,
  getCommentByPostId,
};

//getCommentByPostId,addCommentToPost,deleteComment
