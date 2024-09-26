import type { Config } from "tailwindcss";
const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        bob: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: '0.6' },
          '50%': { transform: 'translateY(-10px) rotate(5deg)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' }, // Keep it just for opacity changes
        },
      },
      animation: {
        bobbing: 'bob 8s ease-in-out infinite, glow 5s ease-in-out infinite', // Combine the animations
      },
    },
  },
  plugins: [],
});

module.exports = config;
