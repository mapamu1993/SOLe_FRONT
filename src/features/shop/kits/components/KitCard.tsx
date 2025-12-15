import React from "react";
import { CheckCircle, Mountain } from "lucide-react";

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
        relative flex flex-col h-full bg-white rounded-2xl overflow-hidden transition-all duration-300
        ${
          isRecommended
            ? "border-2 border-[#582F0E] shadow-xl -translate-y-1" // Marrón oscuro para el VIP
            : "border border-[#A4AC86] shadow-md hover:-translate-y-1 hover:shadow-lg" // Verde suave para normales
        }
      `}
    >
      {/* Etiqueta Recomendado (Top Right) */}
      {isRecommended && (
        <span className="absolute top-3 right-3 z-10 bg-[#582F0E] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md tracking-wide">
          {tagLabel || "RECOMENDADO"}
        </span>
      )}

      {/* Imagen */}
      <div className="h-56 w-full overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Contenido de la tarjeta */}
      <div className="flex flex-col flex-grow p-6 gap-4">
        {/* Pequeño header con icono */}
        <div className="flex items-center gap-2 text-[#656D4A]">
          <Mountain className="w-5 h-5" />
          <span className="text-xs font-bold tracking-widest uppercase">
            CAMINO DE SANTIAGO
          </span>
        </div>

        {/* Título y Precio */}
        <div>
          <h3 className="text-2xl font-bold text-[#333D29] font-serif mb-1 leading-tight">
            {title}
          </h3>
          <p className="text-3xl font-bold text-[#582F0E]">
            {typeof price === "number" ? `${price}€` : price}
          </p>
        </div>

        <hr className="border-[#A4AC86]/30" />

        {/* Lista de características (Checks) */}
        {features.length > 0 && (
          <ul className="space-y-3 mb-2">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-[#333D29]/90"
              >
                <CheckCircle
                  className={`w-5 h-5 min-w-[20px] ${
                    isRecommended ? "text-[#582F0E]" : "text-[#656D4A]"
                  }`}
                />
                <span className="font-medium">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Botón de acción */}
        <button
          onClick={onAction}
          className={`
            mt-auto w-full py-3 px-4 rounded-xl font-bold text-white transition-all duration-200 shadow-sm active:scale-95
            ${
              isRecommended
                ? "bg-[#582F0E] hover:bg-[#7F4F24]"
                : "bg-[#656D4A] hover:bg-[#582F0E]"
            }
          `}
        >
          {buttonText || "Reservar Kit"}
        </button>
      </div>
    </div>
  );
};
