"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

/**
 * @param requiredRole 
 */
export const useAuthGuard = (requiredRole: "ADMIN" | "USER") => {
  const router = useRouter();
  const token = Cookies.get("token");
  const userRole = Cookies.get("role");

  useEffect(() => {
    if (!token) {
      console.log("Unauthorized - No token");
      router.push("/auth/login");
    } else if (userRole !== requiredRole) {
      console.log(`Unauthorized - Required: ${requiredRole}, Found: ${userRole}`);
      if (userRole === "ADMIN") {
        router.push("/dashboard/admin");
      } else if (userRole === "USER") {
        router.push("/dashboard/user");
      } else {
        router.push("/auth/login");
      }
    }
  }, [token, userRole, requiredRole, router]);
};

export const useAdminGuard = () => {
  useAuthGuard("ADMIN");
};

export const useUserGuard = () => {
  useAuthGuard("USER");
};
