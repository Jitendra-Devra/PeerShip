/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"], // Ensure Tailwind scans your files
    theme: {
      extend: {
        colors: {
          primary: "#007BFF",
          secondary: "#FFFFFF",
          accent: "#28A745",
        },
      },
    },
    plugins: [],
  };
  