import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5010", // replace with your backend URL
});

// Add token to requests if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
