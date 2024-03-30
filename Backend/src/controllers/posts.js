const PostsModel = require("../models/Posts");

const seedPosts = async (req, res) => {
  try {
    await PostsModel.deleteMany({});

    await PostsModel.create([
      {
        _id: "660796b6e056e5bbc485eef5",
        title: "TEST1",
        content: "TEST1",
        user_id: "TEST1",
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
        user_id: "TEST2",
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
    res.json({ status: "error", msg: "getting all posts error" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await PostsModel.find();
    res.json(allPosts);
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "getting all posts error" });
  }
};

module.exports = { seedPosts, getAllPosts };
