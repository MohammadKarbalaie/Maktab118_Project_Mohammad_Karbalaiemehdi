import axios from "axios";
import { getValidAccessToken, getRefreshToken } from "./lib/tokenManager";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const accessToken = await getValidAccessToken(); 
    const refreshToken = getRefreshToken();  

    console.log("Access Token in Request Header:", accessToken); 
    console.log("Refresh Token in Request Header:", refreshToken);

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    if (refreshToken) {
      config.headers["x-refresh-token"] = refreshToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
