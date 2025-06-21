import axios, { type AxiosInstance } from "axios";

const customFetch: AxiosInstance = axios.create({
  baseURL: "https://autoplac-backend.onrender.com",
});

export default customFetch;
