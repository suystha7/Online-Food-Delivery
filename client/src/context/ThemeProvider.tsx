"use client"
import { ReactNode, useState } from "react";
import { MyContext } from "./ThemeContext";

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  const values: ThemeContextType = {
    darkMode,
    toggleDarkMode,
  };

  return <MyContext.Provider value={values}>{children}</MyContext.Provider>;
};

export default ThemeProvider;
