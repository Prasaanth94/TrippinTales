const UsersModel = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

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

const register = async (req, res) => {
  try {
    const authUsername = await UsersModel.findOne({
      username: req.body.username,
    }); //finding duplicate username
    if (authUsername) {
      return res
        .status(400)
        .json({ status: "error", msg: "username already exists" });
    }

    const authEmail = await UsersModel.findOne({ email: req.body.email }); //finding duplicate email
    if (authEmail) {
      return res
        .status(400)
        .json({ status: "error", msg: "email already exists" });
    }

    const hash = await bcrypt.hash(req.body.password, 12); //hash password
    await UsersModel.create({
      username: req.body.username,
      hash,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
    });

    res.json({ status: "ok", msg: "user created" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "invalid registration" });
  }
};

const login = async (req, res) => {
  try {
    const auth = await UsersModel.findOne({ email: req.body.email });
    if (!auth) {
      return res.status(400).json({ status: "error", msg: "not authorised" });
    }

    const result = await bcrypt.compare(req.body.password, auth.hash);
    if (!result) {
      console.error("email or password error");
      return res.status(401).json({ status: "error", msg: "login failed" });
    }

    const claims = {
      email: auth.email,
      role: auth.role,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30D",
      jwtid: uuidv4(),
    });

    const user_id = auth._id;

    res.json({ access, refresh, user_id });
  } catch (error) {
    console.error(error.message);
    return res
      .status(400)
      .json({ status: "error", msg: "Catch Caught: Login failed" });
  }
};

const refresh = (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);
    const claims = {
      email: decoded.email,
      role: decoded.role,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    res.json({ access });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "refreshing token failed" });
  }
};
module.exports = { getAllUsers, register, login, refresh };
