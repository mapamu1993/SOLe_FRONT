"use client";
import { useEffect, useState, useRef } from "react";
import { IconQuote } from "@tabler/icons-react";

const testimonials = [
  {
    quote:
      "El kit 'Iniciado' me salvó la vida. Todo lo que necesitaba y nada más. La mochila ni se siente.",
    author: "Marta R.",
    role: "Camino Francés '23",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote:
      "Increíble calidad. Las botas aguantaron lluvia y barro gallego sin una sola ampolla. 10/10.",
    author: "Carlos D.",
    role: "Camino del Norte",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote:
      "La atención al cliente es de otro planeta. Me ayudaron a elegir la talla perfecta por WhatsApp.",
    author: "Ana P.",
    role: "Vía de la Plata",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    quote:
      "Lo mejor es lo ligero que es todo. He hecho el Primitivo y mis rodillas lo han agradecido.",
    author: "Javier M.",
    role: "Camino Primitivo",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    quote:
      "Envío rapidísimo. Pedí el miércoles y el viernes ya estaba estrenando botas en la sierra.",
    author: "Lucía G.",
    role: "Senderista",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    quote:
      "Llovió a mares subiendo O Cebreiro y el poncho del kit aguantó como un campeón. Llegué seco al albergue.",
    author: "Roberto S.",
    role: "Camino Francés '24",
    avatar: "https://randomuser.me/api/portraits/men/86.jpg",
  },
  {
    quote:
      "Los calcetines anti-ampollas son pura magia negra. 800km desde Roncesvalles y mis pies llegaron intactos.",
    author: "Elena M.",
    role: "Peregrina Veterana",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    quote:
      "Compré el kit completo como regalo para mi padre que se jubilaba. Le hizo muchísima ilusión y le sirvió todo.",
    author: "Pablo R.",
    role: "Regalo Familiar",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    quote:
      "Hice el Camino Portugués por la Costa. La ropa técnica se secaba en minutos con la brisa del mar. Un acierto.",
    author: "Inés V.",
    role: "Camino Portugués",
    avatar: "https://randomuser.me/api/portraits/women/29.jpg",
  },
  {
    quote:
      "Soy muy tiquismiquis con el peso y la mochila ultraligera me ha sorprendido. Cabe todo y la espalda no sufre.",
    author: "David L.",
    role: "Ultralight Hiker",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
  },
  {
    quote:
      "Tuve que cambiar la talla de las botas a última hora y la gestión fue impecable. Al día siguiente tenía las nuevas.",
    author: "Sara G.",
    role: "Camino Inglés",
    avatar: "https://randomuser.me/api/portraits/women/90.jpg",
  },
  {
    quote:
      "El saco sábana es un imprescindible para los albergues de verano. Suave, higiénico y no ocupa nada.",
    author: "Miguel A.",
    role: "Vía de la Plata",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  {
    quote:
      "Me daba miedo ir sola, pero los consejos del blog y el material adecuado me dieron la confianza que necesitaba.",
    author: "Carmen F.",
    role: "Camino de Invierno",
    avatar: "https://randomuser.me/api/portraits/women/42.jpg",
  },
  {
    quote:
      "La crema para pies que incluís en el kit Confort es gloria bendita después de una etapa de 30km.",
    author: "Jorge T.",
    role: "Camino Primitivo",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    quote:
      "Valoré mucho que el packaging fuera sostenible y sin plásticos innecesarios. El Camino hay que cuidarlo.",
    author: "Beatriz O.",
    role: "Eco-Peregrina",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
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
      if (scrollerContent.length < testimonials.length * 2) {
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          if (scrollerRef.current) {
            scrollerRef.current.appendChild(duplicatedItem);
          }
        });
      }
      setStart(true);
    }
  }

  return (
    <section className="w-full py-32 md:py-40 bg-[#EBECE2] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <h2 className="text-4xl md:text-5xl font-bold text-[#333D29] tracking-tight leading-tight">
            Voces del <br className="md:hidden" />
            <span className="italic font-serif text-[#582F0E]">Camino</span>
          </h2>
          <IconQuote
            size={48}
            className="text-[#582F0E] opacity-20 hidden md:block"
            stroke={1.5}
          />
        </div>
      </div>

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
            /* CLASE QUE ACTIVA LA ANIMACIÓN SI START ES TRUE */
            ${start ? "animate-scroll-testimonials" : ""}
          `}
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
              <div className="flex gap-1 text-[#B6AD90] mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 fill-current"
                    viewBox="0 0 20 20"
                  >
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

      {/* ESTILOS INTERNOS */}
      <style>{`
        /* 1. Definimos la animación solo para este componente */
        @keyframes scroll-testimonials {
          to { transform: translate(calc(-50% - 0.75rem)); }
        }
        
        /* 2. Aplicamos la animación */
        .animate-scroll-testimonials {
          animation: scroll-testimonials 120s linear infinite;
        }

        /* 3. Pausar al pasar el ratón por encima del CONTENEDOR FLEXIBLE */
        .animate-scroll-testimonials:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

export default TestimonialsSection;
