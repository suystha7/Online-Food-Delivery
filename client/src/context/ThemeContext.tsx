"use client"

import { createContext } from "react"

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// Create context with a default value of `null`
export const MyContext = createContext<ThemeContextType | null>(null)
