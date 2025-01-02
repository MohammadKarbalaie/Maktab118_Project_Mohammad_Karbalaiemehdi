"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import {
  getAccessToken,
  getRefreshToken,
  refreshAccessToken,
  removeTokens,
  setTokens,
} from "../utils/token";

interface DecodedToken {
  exp: number;
  [key: string]: unknown;
}

const AdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleRedirect = useCallback(
    (role: string | undefined) => {
      const isAdminPath = pathname.startsWith("/dashboard/admin");

      if (isAdminPath && role !== "ADMIN") {
        router.push("/not-found"); 
        return;
      }

      if (role === "USER") {
        router.push("/dashboard/user");
      } else if (!role) {
        router.push("/auth/login");
      }
    },
    [router, pathname]
  );

  useEffect(() => {
    const token = getAccessToken();
    const role = Cookies.get("role");

    if (token) {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const decodedToken: DecodedToken = JSON.parse(atob(base64));

        const currentTime = Date.now() / 1000;
        const tokenExpirationTime = decodedToken.exp;

        if (tokenExpirationTime < currentTime) {
          refreshAccessToken().then((newToken) => {
            if (newToken) {
              const refreshToken = getRefreshToken();
              if (refreshToken) {
                setTokens(newToken, refreshToken);
                handleRedirect(role);
              } else {
                removeTokens();
                router.push("/auth/login");
              }
            } else {
              removeTokens();
              router.push("/auth/login");
            }
          });
        } else {
          handleRedirect(role);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        removeTokens();
        router.push("/auth/login");
      }
    } else {
      handleRedirect(role);
    }
  }, [router, pathname, handleRedirect]);

  return <>{children}</>;
};

export default AdminGuard;
