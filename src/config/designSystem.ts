export const BRAND_THEME = {
  colors: {
    // BASES
    background: "#EBECE2", 
    surface: "#FFFFFF",    
    surfaceSoft: "#F5F5F0", 

    // TEXTOS Y ACENTOS
    primary: "#333D29",    
    secondary: "#656D4A",  
    accent: "#582F0E",     
    accentHover: "#7F4F24", 
    
    // DECORACIÓN
    decoration: "#B6AD90", 
    danger: "#EF4444",     
  },
  
  typography: {
    // Títulos grandes 
    headingXl: "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-sans",
    
    // Títulos de página 
    headingLg: "text-3xl md:text-5xl font-bold tracking-tight font-sans text-[#333D29]",
    
    // Títulos de tarjeta
    headingMd: "text-xl md:text-2xl font-bold font-serif text-[#333D29]",
    
    // Subtítulos 
    eyebrow: "text-xs font-bold uppercase tracking-widest text-[#656D4A]",
    
    // Texto cursiva para énfasis 
    highlight: "italic font-serif text-[#582F0E]",
    
    // Cuerpo de texto
    body: "text-base text-[#656D4A] leading-relaxed",
  },

  layout: {
    // Bordes redondeados para la app entera
    borderRadius: {
      card: "rounded-[2.5rem]", // El estilo redondeado
      input: "rounded-xl",
      button: "rounded-full",
    },
    // Espaciado estándar para páginas bajo el navbar
    pagePadding: "pt-24 md:pt-32 pb-12 px-4 md:px-8",
    maxWidth: "max-w-7xl mx-auto",
  }
};