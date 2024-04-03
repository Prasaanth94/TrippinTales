const express = require("express");
const {
  getAllUsers,
  register,
  login,
  refresh,
} = require("../controllers/auth");

const {
  validateRegistrationData,
  validateRefreshToken,
  validateLoginData,
} = require("../validators/auth");

const { errorCheck } = require("../validators/errorCheck");

const router = express.Router();

router.get("/users", getAllUsers);
router.put("/register", validateRegistrationData, errorCheck, register);
router.post("/login", validateLoginData, errorCheck, login);
router.post("/refresh", validateRefreshToken, errorCheck, refresh);

module.exports = router;
