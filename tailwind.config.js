/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <- esto incluye todos tus componentes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
