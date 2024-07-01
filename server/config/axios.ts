import axios from "axios";

export const api = axios.create({
  baseURL: process.env.BASE_URL!,
  headers: {
    api_key: process.env.API_KEY!,
  },
});
