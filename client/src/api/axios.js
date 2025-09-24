import axios from "axios";

const api = axios.create({
  baseURL: "/api", // proxy pasirūpins nukreipimu į backend
});

// automatiškai prideda tokeną
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
