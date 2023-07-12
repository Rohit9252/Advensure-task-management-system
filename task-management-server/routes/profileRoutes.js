const express = require("express");
const router = express.Router();
const { getProfile } = require("../controllers/profileControllers");
const validTokenHandler = require("../middleware/validTokenHandler");

router.get("/", validTokenHandler, getProfile);

module.exports = router;
