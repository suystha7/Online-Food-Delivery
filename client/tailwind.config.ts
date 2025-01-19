import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "text-light": "var(--text-color-light)",
        "text-dark": "var(--text-color-dark)",
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        accent: "var(--accent-color)",
      },
      keyframes: {
        move: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(2px)" }, // Move smoothly to the right
        },
      },
      animation: {
        move: "move 1s ease-in-out infinite", // Smooth left-to-right motion
      },
    },
  },
  plugins: [],
};

export default config;
