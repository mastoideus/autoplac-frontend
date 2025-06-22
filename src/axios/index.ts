import axios, { type AxiosInstance } from "axios";

const customFetch: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

export default customFetch;
