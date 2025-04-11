import React, { useEffect, useState } from "react";
import axios from "axios";

const ShowTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    duedate: "",
    priority: "",
    status: "",
  });

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks", {
        withCredentials: true,
      });
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        withCredentials: true,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleMarkCompleted = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { status: "completed" },
        { withCredentials: true }
      );
      fetchTasks();
    } catch (error) {
      console.error("Error marking task as completed:", error);
    }
  };

  const handleEditClick = (task) => {
    setEditTaskId(task._id);
    setEditForm({
      title: task.title,
      description: task.description,
      duedate: task.duedate?.slice(0, 10) || "",
      priority: task.priority,
      status: task.status,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${editTaskId}`,
        editForm,
        { withCredentials: true }
      );
      setEditTaskId(null);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Your Tasks</h1>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="bg-white p-4 rounded shadow border border-gray-200"
          >
            <h2 className="text-lg font-semibold">{task.title}</h2>
            <p>{task.description}</p>
            <p>
              <strong>Due:</strong>{" "}
              {task.duedate
                ? new Date(task.duedate).toLocaleDateString()
                : "N/A"}
            </p>
            <p>
              <strong>Priority:</strong> {task.priority}
            </p>
            <p>
              <strong>Status:</strong> {task.status}
            </p>

            <div className="flex gap-2 mt-2">
              {task.status !== "completed" && (
                <button
                  onClick={() => handleMarkCompleted(task._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Mark as Completed
                </button>
              )}
              <button
                onClick={() => handleEditClick(task)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>

            {editTaskId === task._id && (
              <form
                onSubmit={handleEditSubmit}
                className="mt-4 space-y-2 border-t pt-4"
              >
                <input
                  type="text"
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                  placeholder="Title"
                  className="w-full border px-2 py-1"
                  required
                />
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  placeholder="Description"
                  className="w-full border px-2 py-1"
                />
                <input
                  type="date"
                  name="duedate"
                  value={editForm.duedate}
                  onChange={handleEditChange}
                  className="w-full border px-2 py-1"
                />
                <select
                  name="priority"
                  value={editForm.priority}
                  onChange={handleEditChange}
                  className="w-full border px-2 py-1"
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <select
                  name="status"
                  value={editForm.status}
                  onChange={handleEditChange}
                  className="w-full border px-2 py-1"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
                <button
                  type="submit"
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Save Changes
                </button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowTasks;
