import React from "react";
import { useRole } from "../utils/role";

type Props = {
  children: React.ReactNode;
};

export const UserGuard: React.FC<Props> = ({ children }) => {
  const role = useRole();

  if (role !== "USER") {
    return <div>شما دسترسی به این صفحه ندارید.</div>;
  }

  return <>{children}</>;
};
