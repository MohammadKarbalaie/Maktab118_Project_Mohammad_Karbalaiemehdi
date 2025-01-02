"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/redux/store";
import { RoleManager } from "@/utils/role";
import { LoginRequest } from "@/types/login";

type Props = {
  children: React.ReactNode;
};

const UserGuard: React.FC<Props> = ({ children }) => {
  const user = useSelector((state: RootState) => state.cart.user);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        console.log("User from Redux:", user);
  
        if (user?.username && user?.password) {
          const loginData: LoginRequest = {
            username: user.username,
            password: user.password,
          };
          const fetchedRole = await RoleManager(loginData);
          console.log("Fetched Role:", fetchedRole);
          setRole(fetchedRole);
        } else {
          console.warn("User credentials are missing");
          setRole(null);
        }
      } catch (error) {
        console.error("Failed to fetch role:", error);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };
  
    fetchRole();
  }, [user]);

  if (loading) {
    return <div>در حال بارگذاری...</div>;
  }
  if (role !== "USER") {
    return <div>شما دسترسی به این صفحه ندارید.</div>;
  }

  return <>{children}</>;
};

export default UserGuard;

