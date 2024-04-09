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

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.patch("/users/:id", validateUpdateBodyInUser, errorCheck, updateUser);
router.post("/users/:username", getUserByUsernameParams);
router.post("/users/follow/:id", followUser);

module.exports = router;
