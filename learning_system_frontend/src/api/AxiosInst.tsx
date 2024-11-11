import axios, { AxiosInstance } from "axios";

const axiosInst: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default axiosInst;
