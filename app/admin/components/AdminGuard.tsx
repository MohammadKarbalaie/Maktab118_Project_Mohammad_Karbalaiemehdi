"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getAccessToken, getRefreshToken, refreshAccessToken, removeTokens, setTokens } from "../../adminserver/lib/tokenManager";

interface DecodedToken {
  exp: number;
  [key: string]: unknown;
}

const AdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // مسیر جاری را می‌گیرد

  useEffect(() => {
    const token = getAccessToken();

    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedToken: DecodedToken = JSON.parse(atob(base64));

        const currentTime = Date.now() / 1000;
        const tokenExpirationTime = decodedToken.exp;

        if (tokenExpirationTime < currentTime) {
          // در صورت انقضای توکن، اقدام به تمدید آن
          refreshAccessToken().then((newToken) => {
            if (newToken) {
              const refreshToken = getRefreshToken();
              if (refreshToken) {
                setTokens(newToken, refreshToken);
                setIsAuthorized(true);
              } else {
                removeTokens();
                router.push("/admin/auth/login");
              }
            } else {
              removeTokens();
              router.push("/admin/auth/login");
            }
          });
        } else {
          setIsAuthorized(true);
          
          // اگر در صفحه لاگین هستیم و کاربر لاگین کرده، به داشبورد منتقل می‌شویم
          if (pathname === "/admin/auth/login") {
            router.push("/admin/dashboard");
          }
        }
      } catch {
        removeTokens();
        router.push("/admin/auth/login");
      }
    } else {
      if (pathname !== "/admin/auth/login") {
        router.push("/admin/auth/login");
      }
    }
  }, [router, pathname]);

  if (!isAuthorized) {
    return <p>در حال بارگذاری...</p>; 
  }

  return <>{children}</>; 
};

export default AdminGuard;
