const PostsModel = require("../models/Posts");

const seedPosts = async (req, res) => {
  try {
    await PostsModel.deleteMany({});

    await PostsModel.create([
      {
        _id: "660796b6e056e5bbc485eef5",
        title: "TEST1",
        content: "TEST1",
        user_id: "660a5929046773e5823df208",
        url: "TEST1.com.sg",
        slug: "/TEST1",
        tags: "TEST",
        images: "TEST1",
        meta_description: "TEST1",
      },
      {
        _id: "660796b6e056e5bbc485eef6",
        title: "TEST2",
        content: "TEST2",
        user_id: "660a5bd84ed8ca64ed7020a5",
        url: "TEST2.com.sg",
        slug: "/TEST2",
        tags: "TEST",
        images: "TEST2",
        meta_description: "TEST2",
      },
    ]);

    res.json({ status: "ok", msg: "seeding successful" });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error getting all posts" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await PostsModel.find();
    res.json(allPosts);
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error getting all posts" });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const posts = await PostsModel.find({ user_id: req.params.user_id });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error getting all posts" });
  }
};

const addNewPost = async (req, res) => {
  try {
    const newPost = {
      title: req.body.title,
      content: req.body.content,
      user_id: req.body.user_id,
      url: req.body.url,
      slug: req.body.slug,
      tags: req.body.tags,
      images: req.body.images,
      meta_description: req.body.meta_description,
    };
    await PostsModel.create(newPost);

    res.json({ status: "ok", msg: "post added", newPost });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "failed to add post" });
  }
};

const deletePost = async (req, res) => {
  try {
    await PostsModel.findByIdAndDelete(req.params.id);
    res.json({ status: "ok", msg: "post deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "failed to delete post" });
  }
};

const updatePost = async (req, res) => {
  try {
    const updatePost = {};
    if ("title" in req.body) updatePost.title = req.body.title;
    if ("content" in req.body) updatePost.content = req.body.content;
    // if ("user_id" in req.body) updatePost.user_id = req.body.user_id;
    if ("url" in req.body) updatePost.url = req.body.url;
    if ("slug" in req.body) updatePost.slug = req.body.slug;
    if ("tags" in req.body) updatePost.tags = req.body.tags;
    if ("images" in req.body) updatePost.images = req.body.images;
    if ("meta_description" in req.body)
      updatePost.meta_description = req.body.meta_description;

    await PostsModel.findByIdAndUpdate(req.params.id);
    res.json({ status: "ok", msg: "post updated", updatePost });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "failed to update post" });
  }
};

module.exports = {
  seedPosts,
  getAllPosts,
  getUserPosts,
  addNewPost,
  deletePost,
  updatePost,
};
