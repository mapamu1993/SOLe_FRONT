import { Link } from "react-router-dom";
import { useKitsQuery } from "../../shop/kits/hooks/useKitsQuery";
import { getImageUrl } from "../../../utils/imageUtil";

export function KitsSection() {
  const { data: kits, isLoading, isError } = useKitsQuery();

  const displayedKits = kits ? kits.slice(0, 3) : [];

  const tags = ["Ultraligero", "Top Ventas", "Impermeable"];

  if (isLoading) {
    return (
      <section className="w-full px-4 md:px-6 py-32 bg-[#EBECE2] flex justify-center">
        <div className="text-[#333D29] font-bold animate-pulse">
          Cargando kits...
        </div>
      </section>
    );
  }

  if (isError || displayedKits.length === 0) return null;

  return (
    <section className="w-full px-4 md:px-6 py-32 md:py-40 bg-[#EBECE2]">
      {/* HEADER SECCIÓN */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-4">
        {/* Bloque de Título + Descripción */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-bold text-[#333D29] tracking-tight">
            Kits de{" "}
            <span className="italic font-serif text-[#582F0E]">
              Peregrino
            </span>
          </h2>
          <p className="mt-4 text-[#656D4A] text-lg max-w-md leading-relaxed font-medium">
            Olvídate de las listas interminables. Hemos preparado la mochila perfecta por ti: equipamiento técnico esencial para llegar a Santiago ligero y feliz.
          </p>
        </div>

        <Link to="/kits" className="hidden md:block">
          <button className="text-[#582F0E] font-bold border-b border-[#582F0E] pb-1 hover:opacity-70 transition-opacity">
            Ver Todos los Packs
          </button>
        </Link>
      </div>

      {/* GRID DE LAS TARJETAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {displayedKits.map((kit, index) => (
          <Link
            to="/kits"
            key={kit._id}
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
              <div className="w-full h-full rounded-[2rem] overflow-hidden relative bg-[#EBECE2]/10">
                <img
                  src={getImageUrl(kit.image)}
                  alt={kit.name}
                  className="
                    w-full 
                    h-full 
                    object-cover 
                    transition-transform 
                    duration-700 
                    group-hover:scale-110
                  "
                />

                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#333D29]">
                  {tags[index % tags.length]}
                </div>
              </div>
            </div>

            {/* ZONA DE INFO */}
            <div className="p-8 pt-6 flex flex-col justify-between grow relative">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1 leading-tight group-hover:text-[#B6AD90] transition-colors line-clamp-1">
                    {kit.name}
                  </h3>
                  <p className="text-[#B6AD90] font-serif italic text-lg opacity-80">
                    Listo para Caminar
                  </p>
                </div>
                <span className="text-3xl font-bold text-white tracking-tight">
                  {kit.price}€
                </span>
              </div>

              <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between text-sm">
                <span className="text-[#EBECE2] font-bold uppercase tracking-wider text-xs group-hover:text-white transition-colors">
                  Ver Contenido
                </span>
                <div className="w-10 h-10 rounded-full bg-[#B6AD90] text-[#333D29] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Botón móvil */}
      <div className="mt-10 text-center md:hidden">
        <Link to="/kits">
          <button className="text-[#582F0E] font-bold border-b border-[#582F0E] pb-1 hover:opacity-70 transition-opacity">
            Ver Tienda Completa
          </button>
        </Link>
      </div>
    </section>
  );
}

export default KitsSection;
