import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#8b5cf6", "#06b6d4", "#22c55e"]; // Pending, In Progress, Completed
const PRIORITY_COLORS = ["#10b981", "#f59e0b", "#ef4444"]; // Low, Medium, High

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [user, setUser] = useState(null); // store user data
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tasks", {
          withCredentials: true,
        });
        setTasks(res.data.tasks);

        const completed = res.data.tasks.filter(
          (task) => task.status === "completed"
        ).length;
        setCompletedTasks(completed);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth", {
          withCredentials: true,
        });
        if (res.data.success) {
          setUser(res.data.user); // assuming user object is returned
        }
      } catch (err) {
        console.error("User fetch failed", err);
      }
    };

    const today = new Date();
    const formatted = today.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    setCurrentDate(formatted);

    fetchTasks();
    fetchUser();
  }, []);

  const totalTasks = tasks.length;
  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  return (
    <div className="flex my-9 min-h-screen bg-gray-100">
      <main className="flex-1 p-6 sm:p-10 max-w-5xl mx-auto">
        <div className="bg-white rounded-xl p-6 shadow mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Good Morning{user ? `, ${user.fullname}` : ""}!
          </h2>
          <p className="text-sm text-gray-500 mb-4">{currentDate}</p>

          <div className="flex flex-wrap gap-6 mt-4">
            <div className="text-sm text-gray-700">
              <strong className="text-blue-600">{totalTasks}</strong> Total
              Tasks
            </div>
            <div className="text-sm text-gray-700">
              <strong className="text-indigo-600">
                {totalTasks - completedTasks}
              </strong>{" "}
              Pending Tasks
            </div>
            <div className="text-sm text-gray-700">
              <strong className="text-cyan-600">
                {Math.round(totalTasks * 0.3)}
              </strong>{" "}
              In Progress
            </div>
            <div className="text-sm text-gray-700">
              <strong className="text-green-600">{completedTasks}</strong>{" "}
              Completed Tasks
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold mb-4">Progress Overview</h3>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-500 h-4 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {Math.round(progress)}% Completed
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
