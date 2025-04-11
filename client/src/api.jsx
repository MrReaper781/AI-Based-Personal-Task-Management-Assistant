import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/auth", // change if backend is hosted elsewhere
  withCredentials: true, // allows sending cookies
});

export default api;
