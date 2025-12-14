"use client";
import React, { useEffect, useState, useRef } from "react";
import { IconQuote } from "@tabler/icons-react";

const testimonials = [
  {
    quote: "El kit 'Iniciado' me salvó la vida. Todo lo que necesitaba y nada más. La mochila ni se siente.",
    author: "Marta R.",
    role: "Camino Francés '23",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    quote: "Increíble calidad. Las botas aguantaron lluvia y barro gallego sin una sola ampolla. 10/10.",
    author: "Carlos D.",
    role: "Camino del Norte",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    quote: "La atención al cliente es de otro planeta. Me ayudaron a elegir la talla perfecta por WhatsApp.",
    author: "Ana P.",
    role: "Vía de la Plata",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    quote: "Lo mejor es lo ligero que es todo. He hecho el Primitivo y mis rodillas lo han agradecido.",
    author: "Javier M.",
    role: "Camino Primitivo",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    quote: "Envío rapidísimo. Pedí el miércoles y el viernes ya estaba estrenando botas en la sierra.",
    author: "Lucía G.",
    role: "Senderista",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg"
  },
];

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });
      setStart(true);
    }
  }

  return (
    <section className="w-full py-32 md:py-40 bg-[#EBECE2] overflow-hidden relative">
      
      {/* CABECERA ESTILO KITS/BLOG (Alineada Izquierda + Mix Fuentes) */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          
          <h2 className="text-4xl md:text-5xl font-bold text-[#333D29] tracking-tight leading-tight">
            Voces del <br className="md:hidden" />
            <span className="italic font-serif text-[#582F0E]">
              Camino
            </span>
          </h2>

          {/* Icono de cita decorativo a la derecha (opcional, para equilibrar) */}
          <IconQuote 
            size={48} 
            className="text-[#582F0E] opacity-20 hidden md:block" 
            stroke={1.5}
          />
        </div>
      </div>

      {/* CONTENEDOR DE SCROLL INFINITO */}
      <div
        ref={containerRef}
        className="relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
      >
        <div
          ref={scrollerRef}
          className={`
            flex 
            min-w-full 
            shrink-0 
            gap-6 
            py-4 
            w-max 
            flex-nowrap
            ${start ? "animate-scroll" : ""}
          `}
          style={{
            animation: start ? "scroll 40s linear infinite" : "none",
          }}
        >
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="
                w-[350px] md:w-[450px] 
                max-w-full 
                relative 
                rounded-[2rem] 
                border border-[#582F0E]/20 
                flex-shrink-0 
                bg-[#333D29] 
                p-8 
                md:p-10
                shadow-xl
                hover:shadow-2xl
                transition-all
              "
            >
              {/* Estrellas */}
              <div className="flex gap-1 text-[#B6AD90] mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="relative z-20 text-lg leading-[1.6] text-[#EBECE2] font-light italic mb-8">
                "{t.quote}"
              </blockquote>

              <div className="relative z-20 mt-auto flex items-center gap-4 pt-6 border-t border-white/10">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="h-12 w-12 rounded-full object-cover border-2 border-[#B6AD90]"
                />
                <span className="flex flex-col gap-1">
                  <span className="text-sm font-bold leading-[1.6] text-white">
                    {t.author}
                  </span>
                  <span className="text-xs leading-[1.6] text-[#B6AD90] uppercase tracking-wide">
                    {t.role}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes scroll {
          to { transform: translate(calc(-50% - 0.75rem)); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

export default TestimonialsSection;