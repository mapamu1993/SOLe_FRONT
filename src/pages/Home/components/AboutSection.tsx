"use client";
import React from "react";
import { ReviewsCarousel } from "../../../components/ui/ReviewsCarousel";
import { IconMountain, IconCompass, IconLeaf } from "@tabler/icons-react";

export function AboutSection() {
  return (
    <section
      className="
      w-full
      px-4
      md:px-6
      pb-20
      bg-[#EBECE2]"
    >
      {/* CONTENEDOR PRINCIPAL */}
      <div
        className="
        relative
        w-full
        bg-[#333D29]
        rounded-[2.5rem]
        overflow-hidden
        flex
        flex-col
        lg:flex-row
        min-h-[750px]
        shadow-2xl"
      >
        {/* 1. TEXTURA TOPOGRÁFICA DE FONDO (El toque "Montaña") */}
        <div
          className="
          absolute
          inset-0
          opacity-10
          pointer-events-none
          mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23B6AD90' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />

        {/* COLUMNA IZQUIERDA: CONTENIDO */}
        <div
          className="
          relative
          z-10
          w-full
          lg:w-1/2
          p-10
          md:p-16
          flex
          flex-col
          justify-center"
        >
          {/* TAG */}
          <div
            className="
            flex
            items-center
            gap-3
            mb-8"
          >
            <span
              className="
              h-[1px]
              w-8
              bg-[#B6AD90]"
            />
            <span
              className="
              text-[#B6AD90]
              font-bold
              tracking-[0.2em]
              text-xs
              uppercase"
            >
              Espíritu Alpino
            </span>
          </div>

          {/* TITULO */}
          <h2
            className="
            text-4xl
            md:text-5xl
            lg:text-6xl
            font-bold
            text-[#F0FDF4]
            leading-tight
            mb-8"
          >
            Nacido en la <br />
            <span
              className="
              text-[#B6AD90]
              italic
              font-serif"
            >
              Montaña.
            </span>
          </h2>

          {/* DESCRIPCIÓN */}
          <p
            className="
            text-[#EBECE2]/80
            text-lg
            font-light
            leading-relaxed
            max-w-md
            mb-12"
          >
            Entendemos que la montaña no perdona el peso extra. Diseñamos equipo
            técnico que respeta la naturaleza y tu espalda, para que solo te
            preocupes de la cima.
          </p>

          {/* 2. GRID DE ICONOS (Rellena el espacio vacío con valor) */}
          <div
            className="
            grid
            grid-cols-1
            sm:grid-cols-3
            gap-6
            mb-12
            border-t
            border-white/10
            pt-8"
          >
            {/* Feature 1 */}
            <div className="space-y-2">
              <IconMountain className="text-[#B6AD90]" size={28} stroke={1.5} />
              <h4 className="text-white font-bold text-sm uppercase tracking-wide">
                Resistencia
              </h4>
            </div>
            {/* Feature 2 */}
            <div className="space-y-2">
              <IconLeaf className="text-[#B6AD90]" size={28} stroke={1.5} />
              <h4 className="text-white font-bold text-sm uppercase tracking-wide">
                Sostenible
              </h4>
            </div>
            {/* Feature 3 */}
            <div className="space-y-2">
              <IconCompass className="text-[#B6AD90]" size={28} stroke={1.5} />
              <h4 className="text-white font-bold text-sm uppercase tracking-wide">
                Técnico
              </h4>
            </div>
          </div>

          {/* BOTÓN (Mismo estilo que te gusta) */}
          <div>
            <button
              className="
              group
              relative
              px-10
              py-4
              bg-transparent
              border
              border-[#B6AD90]
              text-[#B6AD90]
              font-bold
              text-sm
              uppercase
              tracking-widest
              rounded-full
              overflow-hidden
              transition-all
              duration-300"
            >
              <span
                className="
                absolute
                inset-0
                w-full
                h-full
                bg-[#B6AD90]
                transform
                scale-x-0
                origin-left
                transition-transform
                duration-300
                group-hover:scale-x-100"
              />
              <span
                className="
                relative
                z-10
                group-hover:text-[#333D29]"
              >
                Nuestra Historia
              </span>
            </button>
          </div>
        </div>

        {/* COLUMNA DERECHA: CARRUSEL */}
        <div
          className="
          w-full
          lg:w-1/2
          relative
          bg-[#2a3322]
          min-h-[500px]"
        >
          {/* Carrusel */}
          <div
            className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            opacity-90
            mix-blend-lighten"
          >
            <ReviewsCarousel />
          </div>

          {/* Degradado de unión */}
          <div
            className="
            absolute
            inset-y-0
            left-0
            w-32
            bg-gradient-to-r
            from-[#333D29]
            to-transparent
            z-10
            pointer-events-none"
          />

          {/* 3. INSIGNIA FLOTANTE (Detalle Premium) */}
          <div
            className="
            absolute
            bottom-8
            right-8
            z-20
            bg-white/10
            backdrop-blur-md
            border
            border-white/20
            p-4
            rounded-2xl
            max-w-[180px]
            hidden
            md:block"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-[#B6AD90] p-1 rounded-full text-[#333D29]">
                <IconMountain size={14} />
              </div>
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                Certificado
              </span>
            </div>
            <p className="text-[#EBECE2] text-xs font-serif italic leading-tight">
              "El equipo que resiste donde otros fallan."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;