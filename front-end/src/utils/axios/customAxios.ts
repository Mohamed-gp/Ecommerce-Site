import axios from "axios";

const env: string = import.meta.env.VITE_ENV;
console.log(env);

const customAxios = axios.create({
  baseURL:
    env == "production"
      ? "https://swiftbuy.onrender.com/api/"
      : "http://localhost:3000/api/",
  withCredentials: true,
});

export default customAxios;
