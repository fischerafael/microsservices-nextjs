import axios from "axios";

export const api = axios.create({
  baseURL: process.env.BASE_URL!,
  headers: {
    api_key: process.env.API_KEY!,
  },
});

export const apiLinkedinTemplates = axios.create({
  baseURL: "https://crud-firestore-red.vercel.app/api",
  headers: {
    api_key: process.env.API_KEY_ENTITIES!,
    app: "APP.LINKEDIN.TEMPLATES",
  },
});
