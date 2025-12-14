import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    // ESTRUCTURA FRAMER:
    // 1. h-screen: Ocupa toda la pantalla.
    // 2. p-4: Deja un pequeño borde "marco" alrededor de la imagen.
    // 3. bg-[#EBECE2]: El color del borde del marco.
    <section
      className="
    relative
    w-full
    h-screen
    p-4
    bg-[#EBECE2]
    flex
    flex-col
    justify-end"
    >
      {/* TARJETA DE IMAGEN (El contenido real) */}
      <div
        className="
      relative
      w-full
      h-full
      rounded-[2.5rem]
      overflow-hidden
      group shadow-2xl"
      >
        {/* IMAGEN DE FONDO con Zoom lento */}
        <div
          className="
          absolute
          inset-0 
          bg-cover
          bg-center
          transition-transform
          duration-[3s]
          ease-out
          scale-105
          group-hover:scale-100"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop')",
          }}
        />

        {/* GRADIENTE (Overlay) */}
        {/* Oscuro abajo para leer el texto, transparente arriba para ver el cielo/navbar */}
        <div
          className="
        absolute
        inset-0
        bg-gradient-to-t
        from-[#333D29]/90
        via-[#333D29]/20
        to-transparent"
        />

        {/* Capa extra superior sutil para que el Navbar blanco se lea bien si la foto es muy clara */}
        <div
          className="
        absolute
        top-0
        left-0
        w-full 
        h-32 bg-gradient-to-b
        from-black/30
        to-transparent
        pointer-events-none"
        />

        {/* CONTENIDO (Abajo) */}
        <div
          className="
        absolute
        bottom-0 left-0
        w-full p-8
        md:p-12 lg:p-16
        flex
        flex-col
        md:flex-row
        items-end 
        justify-between
        gap-12"
        >
          {/* TEXTO */}
          <div
            className="
          max-w-3xl
          relative
          z-10"
          >
            {/* Badge */}
            <div
              className="
            mb-6 
            inline-flex
            items-center
            gap-3"
            >
              <span
                className="
              h-[1px]
              w-8
              bg-[#B6AD90]
                "
              />
              <span
                className="
              text-[#EBECE2]
              text-xs
              font-bold
              uppercase
              tracking-[0.2em]
              shadow-black
              drop-shadow-md"
              >
                Est. 2024 — Galicia
              </span>
            </div>

            <h1
              className="
            text-5xl
            md:text-7xl
            lg:text-8xl 
            font-bold
            text-white 
            leading-[0.9]
            tracking-tight 
            mb-8
            drop-shadow-lg"
            >
              Camina{" "}
              <span className="italic font-serif text-[#B6AD90]">Ligero</span>,
              <br />
              Vive Profundo.
            </h1>

            <p
              className="
            text-lg
            md:text-xl
            text-[#EBECE2]/90
            max-w-xl
            font-light
            leading-relaxed
            drop-shadow-md"
            >
              Equipamiento de senderismo diseñado para conectar con la
              naturaleza, no para cargar con ella.
            </p>
          </div>

          {/* BOTÓN GIGANTE (Framer Style) */}
          <button
            onClick={() => navigate("/kits")}
            className="
              group/btn
              relative flex items-center justify-center
              w-32 h-32 md:w-40 md:h-40
              rounded-full
              bg-[#B6AD90]
              text-[#333D29]
              font-bold
              text-xs
              uppercase
              tracking-widest
              transition-all duration-500
              hover:bg-[#EBECE2]
              hover:scale-110
              shadow-[0_0_40px_rgba(0,0,0,0.3)]
              z-20
            "
          >
            <span className="z-10 group-hover/btn:-translate-y-2 transition-transform duration-300">
              Ver Kits
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
