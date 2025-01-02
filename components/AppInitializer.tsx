"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { restoreUser } from "@/store/userSlice";

export const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);

  return <>{children}</>;
};
