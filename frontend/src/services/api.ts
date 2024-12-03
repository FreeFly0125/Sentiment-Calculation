/** @format */

import axios from "axios";

const API_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (username: string, password: string) => {
    const response = await api.post("/auth/signin", {
      name: username,
      password: password,
    });
    return response.data;
  },
  register: async (username: string, password: string) => {
    const response = await api.post("/auth/signup", {
      name: username,
      password: password,
    });
    return response.data;
  },
};

export const feedbackService = {
  submitFeedback: async (text: string, username: string | null) => {
    const response = await api.post("/sentiment", {
      user: username,
      feedback: text,
    });
    return response.data;
  },
  getFeedbacks: async () => {
    const response = await api.get("/sentiment");
    return response.data;
  },
};
