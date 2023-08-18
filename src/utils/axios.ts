import axios from "axios";

const CONFIG_BASE_URL = "http://localhost:5000/";

const axiosInstance = axios.create({
  baseURL: CONFIG_BASE_URL,
});

axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';

axiosInstance.interceptors.request.use(
  (config) => {
    const token = `Bearer ${localStorage.getItem("token")}`;
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
