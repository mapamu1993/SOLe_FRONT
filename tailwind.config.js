/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Colores personalizados
      colors: {
        brand: {
          bg: "#C2C5AA", // Beige verdoso de fondo
          card: "#ffffff", // Blanco para tarjetas
          primary: "#582F0E", // Marrón oscuro
          secondary: "#7F4F24", // Marrón claro
        },
      },
    },
  },
  plugins: [],
};
