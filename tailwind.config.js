/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // AQUÍ DEFINIMOS LOS COLORES QUE PIDE TU ARCHIVO UpdateProfileDesign
      colors: {
        brand: {
          bg: "#C2C5AA", // El color de fondo beige/verdoso (usado en Login)
          card: "#ffffff", // Fondo de la tarjeta (blanco)
          primary: "#582F0E", // Color principal marrón oscuro (botones, iconos)
          secondary: "#7F4F24", // Color secundario para degradados y hovers
        },
      },
    },
  },
  plugins: [],
};
