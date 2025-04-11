import React, { useState } from "react";
import axios from "axios";

const CreateTaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duedate, setDuedate] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title,
          description,
          duedate,
          priority,
        },
        { withCredentials: true }
      );
      alert(response.data.message); // Show success message
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="my-9">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <input
          type="date"
          value={duedate}
          onChange={(e) => setDuedate(e.target.value)}
          required
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default CreateTaskForm;
