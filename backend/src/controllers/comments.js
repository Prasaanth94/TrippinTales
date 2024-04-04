const PostsModel = require("../models/Posts");

const getAllComments = async (req, res) => {
  try {
    const allComments = await PostsModel.find();
    res, json(allComments);
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error getting all comments" });
  }
};

module.exports = {
  getAllComments,
};

//getCommentByPostId,addCommentToPost,deleteComment
