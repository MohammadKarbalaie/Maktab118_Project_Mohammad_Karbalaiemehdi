"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getValidAccessToken, removeTokens, setTokens } from "../utils/token";
import apiClient from "../services/api";

interface AuthContextType {
  role: string | null;
  isAuthenticated: boolean;
  getValidAccessToken: () => Promise<string | null>;
  logout: () => void;
  login: (accessToken: string, refreshToken: string, userRole: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  role: null,
  isAuthenticated: false,
  getValidAccessToken: async () => null,
  logout: () => {},
  login: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = await getValidAccessToken();
      const userRole = Cookies.get("role");

      if (accessToken && userRole) {
        setRole(userRole);
        setIsAuthenticated(true);
      } else {
        setRole(null);
        setIsAuthenticated(false);
        removeTokens();
      }
    };

    initializeAuth();
  }, []);

  const logout = () => {
    removeTokens();
    Cookies.remove("role");
    setRole(null);
    setIsAuthenticated(false);
  };

  const login = (accessToken: string, refreshToken: string, userRole: string) => {
    setTokens(accessToken, refreshToken);
    Cookies.set("role", userRole);
    setRole(userRole);
    setIsAuthenticated(true);
  };

  useEffect(() => {
    const interceptor = apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const newAccessToken = await getValidAccessToken();
          if (newAccessToken) {
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return apiClient(originalRequest);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      apiClient.interceptors.response.eject(interceptor);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        role,
        isAuthenticated,
        getValidAccessToken,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

