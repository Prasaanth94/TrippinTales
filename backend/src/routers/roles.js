const express = require("express");
const router = express.Router();
const { getAllRoles } = require("../controllers/roles");

router.get("/", getAllRoles);

module.exports = router;
