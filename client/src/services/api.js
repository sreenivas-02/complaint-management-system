import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // optionally handle global logout
    }
    return Promise.reject(error);
  }
);

export default api;

