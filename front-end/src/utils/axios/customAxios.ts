import axios from "axios";

const env: string = "production";
const customAxios = axios.create({
  baseURL:
    env === "production"
      ? "https://swiftbuy.onrender.com/api/"
      : "http://localhost:3000/api/",
  withCredentials: true,
});

export default customAxios;
