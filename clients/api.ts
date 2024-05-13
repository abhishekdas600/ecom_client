import axios, { AxiosInstance } from "axios";
import { BACKEND_URL } from "./config";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' && window.localStorage ? window.localStorage.getItem('ecom_token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;