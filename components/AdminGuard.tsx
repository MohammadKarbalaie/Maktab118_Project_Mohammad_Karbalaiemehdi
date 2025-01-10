"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const AdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { role, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAccess = async () => {
      if (role === null && !isAuthenticated) return;

      const isAdminPath = pathname.startsWith("/dashboard/admin");

      if (!isAuthenticated) {
        router.push("/auth/login");
        return;
      }

      if (isAdminPath && role !== "ADMIN") {
        router.push("/not-found");
        return;
      }

      if (role === "ADMIN" && pathname === "/dashboard/admin") {
        router.push("/dashboard/admin");
        return;
      }

      if (role === "USER") {
        router.push("/dashboard/user");
      }
    };

    checkAccess();
  }, [role, isAuthenticated, pathname, router]);

  if (!isAuthenticated || role !== "ADMIN") {
    return null;
  }

  return <>{children}</>;
};

export default AdminGuard;
