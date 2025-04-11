const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const taskController = require("../controller/taskController");
const router = express.Router();

router.post("/", authMiddleware, taskController.createTask);
router.get("/", authMiddleware, taskController.getTasks);
router.put("/:id", authMiddleware, taskController.updateTasks);
router.delete("/:id", authMiddleware, taskController.deleteTasks);

module.exports = router;
