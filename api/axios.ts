import axios from "axios";

// Update this with your machine's IP if testing on physical device
// localhost works for iOS Simulator
const API_URL = "http://localhost:3001/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a response interceptor to handle errors globally if needed
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle global errors here (e.g., 401 Unauthorized)
    return Promise.reject(error);
  },
);
