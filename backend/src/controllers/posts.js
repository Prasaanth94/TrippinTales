const PostsModel = require("../models/Posts");

const seedPosts = async (req, res) => {
  try {
    await PostsModel.deleteMany({});

    await PostsModel.create([
      {
        _id: "660796b6e056e5bbc485eef5",
        title: "Best Places To Visit In Indonesia",
        content:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
        user_id: "660a6f8de9abe5ec89322e64",
        url: "TEST1.com.sg",
        slug: "/TEST1",
        tags: "TEST",
        images: "TEST1",
        meta_description: "TEST1",
      },
      {
        _id: "660796b6e056e5bbc485eef6",
        title: "Tasting the World One Plate at a Time",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        user_id: "660a6f8de9abe5ec89322e64",
        url: "TEST2.com.sg",
        slug: "/TEST2",
        tags: "TEST",
        images: "TEST2",
        meta_description: "TEST2",
      },
      {
        _id: "660796b6e056e5bbc485eef7",
        title: "Tales from the Road Less Traveled",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        user_id: "660a7064e9abe5ec89322e74",
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

    const postTime = new Date();
    postTime.setHours(postTime.getHours() + 8); // UTC +8
    newPost.created_at = postTime;

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

    const updateTime = new Date();
    updateTime.setHours(updateTime.getHours() + 8); //UTC +8
    updatePost.updated_at = updateTime;

    await PostsModel.findByIdAndUpdate(req.params.id, updatePost);
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
