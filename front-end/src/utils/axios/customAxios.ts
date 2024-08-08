import axios from "axios";

const env: string = import.meta.env.VITE_ENV;
const token = localStorage.getItem("token");

const customAxios = axios.create({
  baseURL:
    env == "production"
      ? "https://swiftbuy.onrender.com/api/"
      : "http://localhost:3000/api/",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default customAxios;
