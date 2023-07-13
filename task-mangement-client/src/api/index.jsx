import axios from "axios";

const api = axios.create({
  baseURL: "https://advensure-backend.onrender.com/api",
});
export default api;
