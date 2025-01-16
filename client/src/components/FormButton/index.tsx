import { Button, CircularProgress } from "@mui/material";
import React from "react";

interface FormButtonProps {
  type: "submit" | "button";
  children: React.ReactNode;
  isLoading?: boolean;
}

export const FormButton = ({
  type,
  children,
  isLoading = false,
}: FormButtonProps) => {
  return (
    <Button
      type={type}
      disabled={isLoading}
      startIcon={
        isLoading ? (
          <CircularProgress size={24} className="text-background" />
        ) : null
      }
      className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {!isLoading && children}
    </Button>
  );
};
