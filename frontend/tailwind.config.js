/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "udemy-purple": {
          500: "#5624d0",
          600: "#4a1fb8",
          700: "#3e1b9e",
        },
        "udemy-orange": "#fbbf24",
      },
    },
  },
  plugins: [],
};

