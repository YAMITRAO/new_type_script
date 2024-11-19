/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // darkMode: "class",
  theme: {
    extend: {
      colors: {
        "custom-blue": "#1E3A8A", // Custom blue color
        "custom-green": "#10B981", // Custom green color
        "custom-xyz": "#ff006e",
      },
    },
  },
  plugins: [],
};
