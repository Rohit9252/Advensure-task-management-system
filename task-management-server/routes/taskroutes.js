const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../middleware/index");
const { getTasks, getTask, postTask, putTask, deleteTask } = require("../controllers/taskControllers");
const validTokenHandler = require("../middleware/validTokenHandler");

router.get("/", validTokenHandler, getTasks);
router.get("/:taskId", validTokenHandler, getTask);
router.post("/", validTokenHandler, postTask);
router.put("/:taskId", validTokenHandler, putTask);
router.delete("/:taskId", validTokenHandler, deleteTask);


module.exports = router;