import axios, { type AxiosInstance } from "axios";

const customFetch: AxiosInstance = axios.create({
  baseURL: "https://autoplac-frontend.vercel.app",
});

export default customFetch;
