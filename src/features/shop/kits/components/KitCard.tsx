import React from "react";
import { IconCircleCheck, IconMountain, IconArrowRight, IconTrash, IconEdit } from "@tabler/icons-react";

interface KitCardProps {
  image: string;
  title: string;
  description: string;
  price: string | number;
  features?: string[];
  isRecommended?: boolean;
  buttonText?: string;
  tagLabel?: string;
  onAction: () => void;
  canEdit?: boolean;
  onEdit?: () => void;
  onDelete?: () => void; 
}

export const KitCard: React.FC<KitCardProps> = ({
  image,
  title,
  description,
  price,
  features = [],
  isRecommended = false,
  buttonText,
  tagLabel,
  onAction,
  canEdit = false,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      className={`
        group flex flex-col h-full bg-white rounded-[2.5rem] p-4 transition-all duration-500 hover:-translate-y-2
        ${
          isRecommended
            ? "shadow-2xl border-2 border-[#582F0E] z-10" 
            : "shadow-sm hover:shadow-xl border border-transparent hover:border-[#B6AD90]/30"
        }
      `}
    >
      {/* IMAGEN */}
      <div className="relative h-64 w-full overflow-hidden rounded-[2rem] bg-[#EBECE2]">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {isRecommended && (
          <div className="absolute top-4 left-4 bg-[#582F0E] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md z-10">
            {tagLabel || "RECOMENDADO"}
          </div>
        )}
      </div>

      {/* CONTENIDO */}
      <div className="flex flex-1 flex-col pt-6 px-2">
        <div className="flex items-center gap-2 text-[#656D4A] mb-3">
          <IconMountain size={18} stroke={1.5} />
          <span className="text-[10px] font-bold tracking-widest uppercase">
            CAMINO DE SANTIAGO
          </span>
        </div>

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

        <div className="h-px w-full bg-[#EBECE2] mb-4" />

        {features.length > 0 && (
          <ul className="space-y-2 mb-6 flex-1">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-[#656D4A]">
                <IconCircleCheck size={18} className={`min-w-[18px] mt-0.5 ${isRecommended ? "text-[#582F0E]" : "text-[#B6AD90]"}`} />
                <span className="font-medium leading-snug">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <div>
          <p className="text-sm text-[#656D4A] mb-2 flex-1">{description}</p>
        </div>

        {/* ACCIONES Y ADMIN */}
        <div className="mt-auto space-y-4 pt-4 border-t border-[#EBECE2]">
            <div className="flex items-center justify-between gap-3">
                <button
                onClick={onAction}
                className={`
                    group/btn relative flex-1 h-12 text-white font-bold text-xs uppercase tracking-widest rounded-full overflow-hidden shadow-lg transition-all active:scale-95
                    ${isRecommended ? "bg-[#582F0E] hover:shadow-[#582F0E]/40" : "bg-[#333D29] hover:shadow-[#B6AD90]/40"}
                `}
                >
                <span className="absolute inset-0 w-full h-full bg-[#B6AD90] transform scale-x-0 origin-left transition-transform duration-500 group-hover/btn:scale-x-100 ease-out" />
                <span className="relative z-10 flex items-center justify-center gap-2 group-hover/btn:text-[#333D29] transition-colors">
                    {buttonText || "Añadir"} <IconArrowRight size={16} />
                </span>
                </button>

                {/* botones admin  */}
                {canEdit && (
                    <div className="flex gap-2 shrink-0">
                        <button 
                            onClick={(e) => { e.stopPropagation(); onEdit?.(); }}
                            className="p-3 rounded-full bg-[#EBECE2] text-[#333D29] hover:bg-[#333D29] hover:text-white transition-colors shadow-sm"
                            title="Editar"
                        >
                            <IconEdit size={18} />
                        </button>
                        <button 
                            onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
                            className="p-3 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-sm"
                            title="Eliminar"
                        >
                            <IconTrash size={18} />
                        </button>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};