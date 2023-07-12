const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../middleware/index");
const { getTasks, getTask, postTask} = require("../controllers/taskControllers");
const validTokenHandler = require("../middleware/validTokenHandler");

// router.get("/", verifyAccessToken, getTasks);
// router.get("/:taskId", verifyAccessToken, getTask);
router.post("/", validTokenHandler, postTask);

module.exports = router;