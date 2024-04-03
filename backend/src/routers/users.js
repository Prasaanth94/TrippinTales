const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  updateUser,
} = require("../controllers/users");

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.patch("/users/:id", updateUser);

module.exports = router;
