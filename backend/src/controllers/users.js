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
        email: temp.email,
        phone: temp.phone,
        birthdate: temp.birthdate,
        gender: temp.gender,
        greeting: temp.greeting,
        self_description: temp.self_description,
        created_at: temp.created_at,
        account_status: temp.account_status,
        role: temp.role,
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
    const updateUser = {};
    if ("username" in req.body) updateUser.username = req.body.username;
    if ("first_name" in req.body) updateUser.first_name = req.body.first_name;
    if ("last_name" in req.body) updateUser.last_name = req.body.last_name;
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

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  getUserByUsernameParams,
};
