const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  updateUser,
  getUserByUsername,
} = require("../controllers/users");
const { validateBodyInUser } = require("../validators/users");
const { errorCheck } = require("../validators/errorCheck");

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.patch("/users/:id", validateBodyInUser, errorCheck, updateUser);
router.get("/users-username", getUserByUsername);

module.exports = router;
