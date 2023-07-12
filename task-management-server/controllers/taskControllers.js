const Task = require("../models/taskModel");
const { validateObjectId } = require("../utils/validateEmail");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res
      .status(200)
      .json({ tasks, status: true, msg: "Tasks found successfully.." });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

exports.getTask = async (req, res) => {
  try {
    if (!validateObjectId(req.params.taskId)) {
      return res.status(400).json({ status: false, msg: "Task id not valid" });
    }

    const task = await Task.findOne({
      user: req.user.id,
      _id: req.params.taskId,
    });
    if (!task) {
      return res.status(400).json({ status: false, msg: "No task found.." });
    }
    res
      .status(200)
      .json({ task, status: true, msg: "Task found successfully.." });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};


exports.postTask = async (req, res) => {
    try {
      const {title, description, dueDate  } = req.body;
      console.log(dueDate)
      if (!description) {
        return res.status(400).json({ status: false, msg: "Description of task not found" });
      }
      const task = await Task.create({ user: req.user.id, description , dueDate, title});
      res.status(200).json({ task, status: true, msg: "Task created successfully.." });
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
  }