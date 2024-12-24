// TokenManager.tsx
import React, { useEffect, useState } from "react"; 
import Cookies from "js-cookie";
import apiClient, { setAuthHeader } from "../services/api"; 

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

/**
 * @param accessToken
 * @param refreshToken
 */
export const setTokens = (accessToken: string, refreshToken: string) => {
  Cookies.set(ACCESS_TOKEN_KEY, accessToken, { expires: 2 }); 
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { expires: 7 });
  
};

export const getAccessToken = (): string | undefined => {
  return Cookies.get(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = (): string | undefined => {
  return Cookies.get(REFRESH_TOKEN_KEY);
};

export const removeTokens = () => {
  Cookies.remove(ACCESS_TOKEN_KEY, { path: '/' });
  Cookies.remove(REFRESH_TOKEN_KEY, { path: '/' });
};

const isAccessTokenExpired = (token: string): boolean => {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = decoded.exp * 1000; // تبدیل به میلی‌ثانیه
    return expirationTime < Date.now(); // اگر زمان انقضا گذشته باشد true برمی‌گرداند
  } catch (error) {
    console.error('Error decoding access token:', error);
    return true;
  }
};

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    console.log('No refresh token available');
    return null;
  }

  try {
    const response = await apiClient.post("/auth/token", { refreshToken });
    const data = response.data;

    if (data.status === 'success' && data.token.accessToken) {
      const newAccessToken = data.token.accessToken;
      const newRefreshToken = data.token.refreshToken || refreshToken;
      setTokens(newAccessToken, newRefreshToken); 

      setAuthHeader(newAccessToken); 
      return newAccessToken;
    }
    return null;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null;
  }
};

export const getValidAccessToken = async (): Promise<string | null> => {
  const accessToken = getAccessToken();

  if (accessToken && !isAccessTokenExpired(accessToken)) {
    setAuthHeader(accessToken); 
    return accessToken;
  }

  console.log('Access token is expired or not available. Attempting to refresh token...');

  const newAccessToken = await refreshAccessToken();
  if (newAccessToken) {
    return newAccessToken;
  }

  console.log('Failed to refresh access token.');
  return null;
};

const TokenManager = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await getValidAccessToken();
      if (token) {
        setAccessToken(token); 
      }
    };

    fetchAccessToken();
  }, []);

  if (!accessToken) {
    return null; 
  }

  return children; 
};

export default TokenManager;
