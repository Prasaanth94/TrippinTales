const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  updateUser,
  getUserByUsernameParams,
  followUser,
} = require("../controllers/users");
const {
  validateBodyInUser,
  validateUpdateBodyInUser,
} = require("../validators/users");
const { errorCheck } = require("../validators/errorCheck");
const { authUser } = require("../middleware/auth");

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.patch("/users/:id", validateUpdateBodyInUser, errorCheck, updateUser);
router.post("/users/:username", getUserByUsernameParams);
router.post("/users/follow/:id", authUser, followUser);

module.exports = router;
