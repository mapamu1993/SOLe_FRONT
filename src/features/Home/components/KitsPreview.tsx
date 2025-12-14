"use client";
import React from "react";

const kitsData = [
  {
    title: "El Iniciado",
    price: "149€",
    image:
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=800&auto=format&fit=crop",
    tag: "Essential",
  },
  {
    title: "Veterano Pro",
    price: "289€",
    image:
      "https://images.unsplash.com/photo-1526772662000-3f88f107f5d8?q=80&w=800&auto=format&fit=crop",
    tag: "Best Seller",
  },
  {
    title: "Alta Montaña",
    price: "345€",
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop",
    tag: "Thermal",
  },
];

export function KitsSection() {
  return (
    // CAMBIO AQUI: py-32 md:py-40 (Más separación vertical)
    <section className="w-full px-4 md:px-6 py-32 md:py-40 bg-[#EBECE2]">
      
      {/* HEADER SECCIÓN */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-[#333D29] tracking-tight">
          Kits{" "}
          <span className="italic font-serif text-[#582F0E]">
            Curados
          </span>
        </h2>
        <button className="hidden md:block text-[#582F0E] font-bold border-b border-[#582F0E] pb-1 hover:opacity-70 transition-opacity">
          Ver Tienda Completa
        </button>
      </div>

      {/* GRID DE TARJETAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {kitsData.map((kit, index) => (
          <div
            key={index}
            className="
              group 
              relative 
              flex 
              flex-col
              bg-[#333D29] 
              rounded-[2.5rem] 
              overflow-hidden 
              cursor-pointer
              shadow-xl
              hover:shadow-2xl
              hover:-translate-y-2
              transition-all
              duration-500
            "
          >
            {/* ZONA DE IMAGEN */}
            <div className="relative h-[320px] w-full overflow-hidden p-3 pb-0">
              <div className="w-full h-full rounded-[2rem] overflow-hidden relative">
                <img
                  src={kit.image}
                  alt={kit.title}
                  className="
                    w-full 
                    h-full 
                    object-cover 
                    transition-transform 
                    duration-700 
                    group-hover:scale-110
                  "
                />
                
                {/* Tag Flotante */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#333D29]">
                  {kit.tag}
                </div>
              </div>
            </div>

            {/* ZONA DE INFO */}
            <div className="p-8 pt-6 flex flex-col justify-between grow relative">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1 leading-tight group-hover:text-[#B6AD90] transition-colors">
                    {kit.title}
                  </h3>
                  <p className="text-[#B6AD90] font-serif italic text-lg opacity-80">
                    Edición Limitada
                  </p>
                </div>
                <span className="text-3xl font-bold text-white tracking-tight">
                  {kit.price}
                </span>
              </div>

              <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between text-sm">
                <span className="text-[#EBECE2] font-bold uppercase tracking-wider text-xs">
                  Ver Detalles
                </span>
                <div className="w-10 h-10 rounded-full bg-[#B6AD90] text-[#333D29] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default KitsSection;