import React from "react";
// CORRECCIÓN: Usamos Tabler Icons (ya instalado)
import { IconCircleCheck, IconMountain, IconArrowRight } from "@tabler/icons-react";

interface KitCardProps {
  image: string;
  title: string;
  price: string | number;
  features?: string[];
  isRecommended?: boolean;
  buttonText?: string;
  tagLabel?: string;
  onAction: () => void;
}

export const KitCard: React.FC<KitCardProps> = ({
  image,
  title,
  price,
  features = [],
  isRecommended = false,
  buttonText,
  tagLabel,
  onAction,
}) => {
  return (
    <div
      className={`
        group relative flex flex-col h-full bg-white rounded-[2.5rem] p-4 transition-all duration-500 hover:-translate-y-2
        ${
          isRecommended
            ? "shadow-2xl border-2 border-[#582F0E] z-10" // Destacado VIP
            : "shadow-sm hover:shadow-xl border border-transparent hover:border-[#B6AD90]/30" // Normal
        }
      `}
    >
      {/* 1. SECCIÓN IMAGEN (Contenedor redondeado interno) */}
      <div className="relative h-64 w-full overflow-hidden rounded-[2rem] bg-[#EBECE2]">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Etiqueta Recomendado (Flotante) */}
        {isRecommended && (
          <div className="absolute top-4 left-4 bg-[#582F0E] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md z-10">
            {tagLabel || "RECOMENDADO"}
          </div>
        )}
      </div>

      {/* 2. CONTENIDO */}
      <div className="flex flex-1 flex-col pt-6 px-2">
        
        {/* Header Pequeño */}
        <div className="flex items-center gap-2 text-[#656D4A] mb-3">
          <IconMountain size={18} stroke={1.5} />
          <span className="text-[10px] font-bold tracking-widest uppercase">
            CAMINO DE SANTIAGO
          </span>
        </div>

        {/* Título y Precio */}
        <div className="mb-4">
          <div className="flex justify-between items-start gap-2">
             <h3 className="text-xl font-bold text-[#333D29] leading-tight group-hover:text-[#582F0E] transition-colors font-serif">
                {title}
             </h3>
             <span className="text-xl font-bold text-[#582F0E] shrink-0">
                {typeof price === "number" ? `${price}€` : price}
             </span>
          </div>
        </div>

        {/* Separador sutil */}
        <div className="h-px w-full bg-[#EBECE2] mb-4" />

        {/* Lista de Features */}
        {features.length > 0 && (
          <ul className="space-y-2 mb-6 flex-1">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-[#656D4A]"
              >
                <IconCircleCheck
                  size={18}
                  className={`min-w-[18px] mt-0.5 ${
                    isRecommended ? "text-[#582F0E]" : "text-[#B6AD90]"
                  }`}
                />
                <span className="font-medium leading-snug">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* 3. BOTÓN SWIPE (Interactivo) */}
        <button
          onClick={onAction}
          className={`
            mt-auto group/btn relative w-full h-12 text-white font-bold text-xs uppercase tracking-widest rounded-full overflow-hidden shadow-lg transition-all active:scale-95
            ${isRecommended ? "bg-[#582F0E] hover:shadow-[#582F0E]/40" : "bg-[#333D29] hover:shadow-[#B6AD90]/40"}
          `}
        >
          {/* Fondo animado al hacer hover */}
          <span className="absolute inset-0 w-full h-full bg-[#B6AD90] transform scale-x-0 origin-left transition-transform duration-500 group-hover/btn:scale-x-100 ease-out" />
          
          {/* Texto e Icono */}
          <span className="relative z-10 flex items-center justify-center gap-2 group-hover/btn:text-[#333D29] transition-colors">
            {buttonText || "Reservar Kit"} <IconArrowRight size={16} />
          </span>
        </button>
      </div>
    </div>
  );
};