import React from "react";
import { ChevronRight } from "lucide-react";

interface DetailSection {
  title: string;
  items: string[];
}

interface KitDetailProps {
  description: string;
  sections?: DetailSection[];
}

export const KitDetail: React.FC<KitDetailProps> = ({
  description,
  sections = [],
}) => {
  return (
    <div className="mt-4 p-6 bg-[#fdfcf5] border border-[#A4AC86] rounded-2xl shadow-sm relative">
      {/* Triángulo decorativo CSS apuntando hacia arriba */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#fdfcf5] border-t border-l border-[#A4AC86] rotate-45 transform"></div>

      {/* Descripción narrativa */}
      <p className="text-[#333D29] italic leading-relaxed mb-6 font-serif border-l-4 border-[#656D4A] pl-4">
        "{description}"
      </p>

      {/* Secciones de detalles (Grid en pantallas grandes) */}
      <div className="grid gap-6 sm:grid-cols-2">
        {sections.map((section, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-xl border border-[#A4AC86]/20 shadow-sm"
          >
            <h4 className="text-xs font-bold text-[#582F0E] uppercase tracking-widest mb-3 border-b border-[#A4AC86]/30 pb-1">
              {section.title}
            </h4>
            <ul className="space-y-2">
              {section.items.map((item, itemIdx) => (
                <li
                  key={itemIdx}
                  className="flex items-start gap-2 text-sm text-[#333D29]"
                >
                  <ChevronRight className="w-4 h-4 text-[#7F4F24] mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
