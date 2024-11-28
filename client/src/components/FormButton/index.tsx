import { Button } from "@mui/material";
import React from "react";

interface FormButtonProps {
  type: "submit" | "button";
  children: React.ReactNode;
}

export const FormButton = ({ type, children }: FormButtonProps) => {
  return (
    <Button
      type={type}
      className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {children}
    </Button>
  );
};
