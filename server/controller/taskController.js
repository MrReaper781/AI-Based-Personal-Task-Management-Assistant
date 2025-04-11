const Task = require("../models/tasks.js");

// Create Task
const createTask = async (req, res) => {
  try {
    const { title, description, duedate, priority } = req.body;

    const task = new Task({
      user: req.userId,
      title,
      description,
      duedate,
      priority,
    });

    await task.save();

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get All Tasks for Logged-in User
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update Task
const updateTasks = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.userId) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found or unauthorized" });
    }

    const { title, description, duedate, priority, status } = req.body;

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.duedate = duedate ?? task.duedate;
    task.priority = priority ?? task.priority;
    task.status = status ?? task.status;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete Task
const deleteTasks = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.userId) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found or unauthorized" });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getTasks, createTask, updateTasks, deleteTasks };
