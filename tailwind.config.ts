// tailwind.config.js
export default {
  content: [
    "./index.html",
    // Asegúrate de que incluya "ts" y "tsx"
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // RECUERDA: Pon aquí los HEX de tu foto
        'brand-primary': '#936639',   
        'brand-secondary': '#a68a64', 
        'brand-bg': '#a4ac86',        
        'brand-card': '#656d4a',      
      }
    },
  },
  plugins: [],
}