"use client";
import { useEffect, useState, useRef } from "react";
import { IconQuote } from "@tabler/icons-react";

const testimonials = [
  {
    quote:
      "El Kit Peregrino 'Iniciado' fue mi salvación. Llevé solo lo esencial y mi espalda lo agradeció en cada etapa hasta Santiago.",
    author: "Marta R.",
    role: "Camino Francés '23",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote:
      "Las botas de trekking soportaron el barro gallego y la lluvia continua sin una sola ampolla. Calidad técnica imprescindible.",
    author: "Carlos D.",
    role: "Camino del Norte",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote:
      "No sabía qué llevar en la mochila. Su equipo me asesoró por WhatsApp para el Camino de Invierno. Atención de 10.",
    author: "Ana P.",
    role: "Vía de la Plata",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    quote:
      "Hacer el Camino Primitivo con vuestro equipamiento ultraligero fue otra historia. Cero dolor de rodillas en las subidas duras.",
    author: "Javier M.",
    role: "Camino Primitivo",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    quote:
      "Me faltaba material a dos días de salir. El envío 24h me salvó la vida. Ya estoy caminando con las botas nuevas.",
    author: "Lucía G.",
    role: "Senderista Exprés",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    quote:
      "El poncho de lluvia técnico es obligatorio. Subiendo O Cebreiro diluvió y llegué seco al albergue. Material top.",
    author: "Roberto S.",
    role: "Camino Francés '24",
    avatar: "https://randomuser.me/api/portraits/men/86.jpg",
  },
  {
    quote:
      "800km desde Roncesvalles y ni una rozadura. Los calcetines anti-ampollas del kit son la mejor inversión que he hecho.",
    author: "Elena M.",
    role: "Peregrina Veterana",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    quote:
      "Regalé el Pack Peregrino Completo a mi padre por su jubilación. Le ha facilitado la vida en su primer Camino.",
    author: "Pablo R.",
    role: "Regalo Familiar",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    quote:
      "En el Camino Portugués por la Costa la humedad es alta. Vuestra ropa técnica se secaba en minutos. Muy recomendada.",
    author: "Inés V.",
    role: "Camino Portugués",
    avatar: "https://randomuser.me/api/portraits/women/29.jpg",
  },
  {
    quote:
      "Como experto en senderismo ultraligero, vuestro material cumple. Peso mínimo, resistencia máxima. Un acierto total.",
    author: "David L.",
    role: "Ultralight Hiker",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
  },
  {
    quote:
      "Tuve que cambiar las botas por una talla más (consejo: pedid una más para el Camino) y la gestión fue rapidísima.",
    author: "Sara G.",
    role: "Camino Inglés",
    avatar: "https://randomuser.me/api/portraits/women/90.jpg",
  },
  {
    quote:
      "El saco sábana de seda es fundamental para la higiene en albergues. No pesa nada y se duerme de lujo.",
    author: "Miguel A.",
    role: "Vía de la Plata",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  {
    quote:
      "Hacer el Camino sola impone, pero ir bien equipada con vuestro kit de seguridad me dio la confianza para lanzarme.",
    author: "Carmen F.",
    role: "Camino de Invierno",
    avatar: "https://randomuser.me/api/portraits/women/42.jpg",
  },
  {
    quote:
      "La crema de recuperación del Kit Confort es mano de santo tras etapas de 30km. Mis pies amanecían nuevos.",
    author: "Jorge T.",
    role: "Camino Primitivo",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    quote:
      "Valoro mucho que seáis una marca eco-friendly. El Camino se disfruta más sabiendo que no dejamos huella plástica.",
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
            Comunidad de <br className="md:hidden" />
            <span className="italic font-serif text-[#582F0E]">Peregrinos</span>
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