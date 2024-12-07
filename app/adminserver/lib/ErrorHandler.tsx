import React from "react";
import toast, { Toaster } from "react-hot-toast";

type NotificationType = "success" | "error";

interface ErrorHandlerProps {
  message: string;
  type: NotificationType;
}

const ErrorHandler: React.FC<ErrorHandlerProps> = ({ message, type }) => {
  React.useEffect(() => {
    if (type === "success") {
      toast.success(message, {
        style: {
          background: "#d1fae5", 
          color: "#065f46", 
        },
      });
    } else if (type === "error") {
      toast.error(message, {
        style: {
          background: "#fee2e2", 
          color: "#991b1b", 
        },
      });
    }
  }, [message, type]);

  return <Toaster position="top-right" />;
};

export default ErrorHandler;
