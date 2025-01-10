import Cookies from "js-cookie";
import apiClient, { setAuthHeader } from "../services/api";
import { urls } from "@/services/urls";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const setTokens = (accessToken: string, refreshToken: string) => {
  Cookies.set(ACCESS_TOKEN_KEY, accessToken, { expires: 2 });
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { expires: 7 });
  setAuthHeader(accessToken);
};

export const getAccessToken = (): string | undefined => {
  return Cookies.get(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = (): string | undefined => {
  return Cookies.get(REFRESH_TOKEN_KEY);
};

export const removeTokens = () => {
  Cookies.remove(ACCESS_TOKEN_KEY, { path: "/" });
  Cookies.remove(REFRESH_TOKEN_KEY, { path: "/" });
  setAuthHeader(null as unknown as string);
};

const isAccessTokenExpired = (token: string): boolean => {
  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    const expirationTime = decoded.exp * 1000;
    return expirationTime < Date.now();
  } catch (error) {
    console.error("Error decoding access token:", error);
    return true;
  }
};

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    console.log("[Token] No refresh token available");
    return null;
  }

  try {
    const response = await apiClient.post(urls.auth.generateToken, { refreshToken });
    const data = response.data;
    console.log('resf',response);
    

    if (data.status === "success" && data.token.accessToken) {
      const newAccessToken = data.token.accessToken;
      const newRefreshToken = data.token.refreshToken || refreshToken;
      setTokens(newAccessToken, newRefreshToken);
      return newAccessToken;
    }
    return null;
  } catch (error) {
    console.error("[Token] Error refreshing token:", error);
    return null;
  }
};

export const getValidAccessToken = async (): Promise<string | null> => {
  const accessToken = getAccessToken();

  if (accessToken && !isAccessTokenExpired(accessToken)) {
    setAuthHeader(accessToken);
    return accessToken;
  }

  console.log("[Token] Access token expired or unavailable. Refreshing...");
  const newAccessToken = await refreshAccessToken();
  return newAccessToken;
};
