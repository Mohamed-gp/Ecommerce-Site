import axios from "axios";
import store from "../../redux/store";

const env = import.meta.env.VITE_ENV;
const customAxios = axios.create({
  baseURL:
    env === "production"
      ? "https://swiftbuy1.production-server.tech/api/"
      : "http://localhost:3000/api/",
  withCredentials: true, 
});

// Add a request interceptor
customAxios.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth?.user?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default customAxios;
