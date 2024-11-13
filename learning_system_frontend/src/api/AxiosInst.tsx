import axios, { AxiosInstance } from "axios";

let token: string | null = localStorage.getItem("token");

const axiosInst: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  timeout: 5000,
});

export default axiosInst;
