import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/authPages/Login";
import Dashboard from "./pages/taskpages/Dashboard";
import PrivateRoute from "./pages/authPages/PrivateRoute";
import Register from "./pages/authPages/Register";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import CreateTaskForm from "./pages/taskpages/CreateTaskForm";
import ShowTasks from "./pages/taskpages/ShowTasks";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreateTaskForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/showtasks"
          element={
            <PrivateRoute>
              <ShowTasks />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
