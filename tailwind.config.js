/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#C2C5AA",
          card: "#ffffff",
          primary: "#582F0E",
          secondary: "#7F4F24",
        },
      },
      // AÑADE ESTO DE NUEVO PARA QUE EL CARRUSEL DE FOTOS SE MUEVA
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        scroll: {
          to: {
            // El gap en InfiniteMovingCards es gap-4 (1rem), así que el offset es 0.5rem
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
    },
  },
  plugins: [],
};
