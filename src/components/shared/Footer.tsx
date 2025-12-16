// Importa la librería React para la creación de componentes
import React from "react";
// Importa el componente Link para la navegación interna sin recargar la página
import { Link } from "react-router-dom";
// Importa los iconos de redes sociales y correo desde la librería tabler-icons
import {
  IconBrandInstagram,
  IconBrandX,
  IconMail,
} from "@tabler/icons-react";

// Define el componente funcional Footer
const Footer = () => {
  // Retorna la estructura JSX del pie de página
  return (
    // Etiqueta footer con estilos de ancho completo, fondo oscuro, texto claro y padding vertical
    <footer
      className="
    w-full
    bg-[#333D29]
    text-[#EBECE2]
    px-4
    md:px-6
    py-20 
    pb-10"
    >
      {/* Contenedor principal centrado con ancho máximo y altura mínima definida */}
      <div
        className="
      max-w-7xl
      mx-auto
      flex 
      flex-col
      justify-between
      min-h-[400px]"
      >
        {/* Sección de enlaces organizada en una cuadrícula (grid) */}
        <div
          className="
        grid
        grid-cols-2
        md:grid-cols-4
        gap-12
        mb-20"
        >
          {/* Primera columna: Enlaces de exploración */}
          <div className="space-y-4">
            {/* Título de la sección Explorar */}
            <h4 className="text-white font-bold mb-6">Explorar</h4>
            {/* Enlace a la página de inicio */}
            <Link to="/" className="block text-[#B6AD90] hover:text-white">
              Home
            </Link>
            {/* Enlace a la sección de tienda/kits */}
            <Link to="/kits" className="block text-[#B6AD90] hover:text-white">
              Tienda
            </Link>
            {/* Enlace a la página de filosofía/nosotros */}
            <Link to="/about" className="block text-[#B6AD90] hover:text-white">
              Filosofía
            </Link>
          </div>
          {/* Segunda columna: Enlaces de ayuda */}
          <div className="space-y-4">
            {/* Título de la sección Ayuda */}
            <h4 className="text-white font-bold mb-6">Ayuda</h4>
            {/* Enlace a la página de contacto */}
            <Link
              to="/contacto"
              className="block text-[#B6AD90] hover:text-white"
            >
              Contacto
            </Link>
            {/* Enlace a preguntas frecuentes (FAQ) */}
            <Link to="/faq" className="block text-[#B6AD90] hover:text-white">
              FAQ
            </Link>
          </div>
          {/* Tercera columna (Redes sociales), ocupa 2 columnas en pantallas medianas */}
          <div
            className="
          md:col-span-2
          flex
          flex-col
          items-start
          md:items-end"
          >
            {/* Título de la sección Social */}
            <h4 className="text-white font-bold mb-6">Social</h4>
            {/* Contenedor flexible para los iconos */}
            <div className="flex gap-4">
              {/* Botón circular para Instagram con borde y efecto hover */}
              <div
                className="
              p-3
              rounded-full
              border
              border-white/10
              hover:bg-white
              hover:text-[#333D29] 
              transition-all 
              cursor-pointer"
              >
                <IconBrandInstagram size={20} />
              </div>
              {/* Botón circular para Twitter con borde y efecto hover */}
              <div
                className="
              p-3
              rounded-full
              border
              border-white/10
              hover:bg-white
              hover:text-[#333D29]
              transition-all
              cursor-pointer"
              >
                <IconBrandX size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Sección inferior con el logo gigante decorativo y enlaces legales */}
        <div
          className="
        border-t
        border-white/10
        pt-10
        flex 
        flex-col
        md:flex-row
        justify-between 
        items-end"
        >
          {/* Texto 'SOLE' gigante de fondo con muy baja opacidad y no seleccionable */}
          <h1
            className="
          text-[15vw]
          leading-none
          font-bold
          text-[#F0FDF4]/5 
          select-none
          pointer-events-none"
          >
            SOL-e
          </h1>
          {/* Texto de copyright y enlaces legales alineados al final */}
          <div
            className="
          flex 
          gap-8
          text-xs
          text-[#B6AD90]
          uppercase 
          tracking-widest 
          pb-4"
          >
            <span>© 2024 SOL-e</span>
            <span>Privacidad</span>
            <span>Legal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Exporta el componente Footer para su uso en otras partes de la aplicación
export default Footer;