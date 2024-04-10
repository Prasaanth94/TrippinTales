const UsersModel = require("../models/Users");

const getAllUsers = async (req, res) => {
  try {
    const users = await UsersModel.find();

    const outputArray = [];
    for (const user of users) {
      const temp = user.toObject();
      outputArray.push({
        username: temp.username,
        first_name: temp.first_name,
        last_name: temp.last_name,
        profile_picture_url: temp.profile_picture_url,
        email: temp.email,
        phone: temp.phone,
        birthdate: temp.birthdate,
        gender: temp.gender,
        greeting: temp.greeting,
        self_description: temp.self_description,
        created_at: temp.created_at,
        account_status: temp.account_status,
        role: temp.role,
        followers: temp.followers,
        following: temp.following,
      });
    }
    res.json(outputArray);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error getting users" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await UsersModel.findById(req.params.id);
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error getting user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { username } = req.body;
    const existingUser = await UsersModel.findOne({ username });
    if (existingUser && existingUser._id.toString() !== req.params.id) {
      return res
        .status(400)
        .json({ status: "error", msg: "username already exists!" });
    }

    const updateUser = {};
    if ("username" in req.body) updateUser.username = req.body.username;
    if ("first_name" in req.body) updateUser.first_name = req.body.first_name;
    if ("last_name" in req.body) updateUser.last_name = req.body.last_name;
    if ("profile_picture_url" in req.body)
      updateUser.profile_picture_url = req.body.profile_picture_url;
    if ("email" in req.body) updateUser.email = req.body.email;
    if ("phone" in req.body) updateUser.phone = req.body.phone;
    if ("birthdate" in req.body) updateUser.birthdate = req.body.birthdate;
    if ("gender" in req.body) updateUser.gender = req.body.gender;
    if ("greeting" in req.body) updateUser.greeting = req.body.greeting;
    if ("self_description" in req.body)
      updateUser.self_description = req.body.self_description;

    await UsersModel.findByIdAndUpdate(req.params.id, updateUser);

    res.json({ status: "ok", msg: "user updated" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error updating user" });
  }
};

const getUserByUsernameParams = async (req, res) => {
  try {
    const username = req.params.username;
    const users = await UsersModel.find({
      username: { $regex: username, $options: "i" },
    }); // case insensitive, partial matching using regex

    if (username === "[]") {
      return console.error(error.message);
    } // if no such user, return error message instead of empty array
    res.json({ users });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "No users found" });
  }
};

const followUser = async (req, res) => {
  try {
    //checking if the user to follow exists
    const userToFollow = await UsersModel.findById(req.params.id);
    if (!userToFollow) {
      return res.status(404).json({ status: "error", msg: "User not found" });
    }

    //getting the current logged in user
    const currentUser = await UsersModel.findById(req.decoded.loggedInId);

    if (!currentUser) {
      return res
        .status(404)
        .json({ status: "error", msg: "Current user not found" });
    }
    //pus the usertofollow id into the loggedin users following
    currentUser.following.push(req.params.id);
    userToFollow.followers.push(req.decoded.loggedInId);
    await currentUser.save();
    await userToFollow.save();

    res.json({
      status: "success",
      msg: "User followed successfully",
      followers: userToFollow.followers,
      following: currentUser.following,
    });
  } catch (error) {
    // Log error to console for debugging
    console.error(error.message);
    // Send a generic error response
    res.status(500).json({ status: "error", msg: "Failed to follow user" });
  }
};

module.exports = {
  followUser,
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  getUserByUsernameParams,
  followUser,
};
