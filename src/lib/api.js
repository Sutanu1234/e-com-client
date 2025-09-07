import axios from "axios";

const API = axios.create({
  baseURL: "https://e-com-server-production.up.railway.app", // replace with your backend URL
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
