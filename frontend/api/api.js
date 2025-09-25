
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  withCredentials: true, 
  headers:{
    "Content-Type":"application/json"
  } 
});

export const signup = (data) => api.post("/auth/register", data);
export const login = (data) => api.post("/auth/login", data);
export const getProfile = () => api.get("/auth/profile");
export const validateToken = () => api.get("/auth/validate");
export const updateProfile = (data) => api.put("/auth/profile", data);
export const logout = () => api.post("/auth/logout");

export default api;