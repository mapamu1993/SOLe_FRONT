import React from "react";
import { Link } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";

const blogPreviews = [
  {
    id: "1",
    title: "Preparación física: 5 claves antes de empezar",
    category: "Guía Básica",
    excerpt: "No necesitas ser un atleta, pero preparar tus pies y espalda marcará la diferencia.",
    image: "https://images.unsplash.com/photo-1533222481259-ce70b163f867?q=80&w=800&auto=format&fit=crop",
    date: "12 Oct",
  },
  {
    id: "2",
    title: "La magia del Camino Francés en Otoño",
    category: "Inspiración",
    excerpt: "Descubre por qué octubre y noviembre son los meses favoritos de los veteranos.",
    image: "https://images.unsplash.com/photo-1442120108414-42e7ea50d0b5?q=80&w=800&auto=format&fit=crop",
    date: "08 Nov",
  },
  {
    id: "3",
    title: "Guía de equipaje: ¿Qué sobra en tu mochila?",
    category: "Equipo",
    excerpt: "El error número 1 del peregrino novato es el peso. Analizamos lo imprescindible.",
    image: "https://images.unsplash.com/photo-1623164344075-8eb34c9c43d8?q=80&w=800&auto=format&fit=crop",
    date: "15 Ene",
  },
];

export function BlogPreview() {
  return (
    <section className="w-full py-32 md:py-40 px-4 md:px-6 bg-[#F2F2EF] relative z-10">
      
      <div className="max-w-6xl mx-auto">
        
        {/* CABECERA (Estilo Kits: Flex con botón a la derecha) */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[#333D29] tracking-tight">
            Diario del{" "}
            <span className="italic font-serif text-[#582F0E]">
              Camino
            </span>
          </h2>
          
          <Link 
            to="/blog" 
            className="hidden md:block text-[#582F0E] font-bold border-b border-[#582F0E] pb-1 hover:opacity-70 transition-opacity"
          >
            Ver todo el blog
          </Link>
        </div>

        {/* LISTA DE ARTÍCULOS */}
        <div className="flex flex-col gap-8">
          {blogPreviews.map((blog) => (
            <Link 
              to={`/blog/${blog.id}`} 
              key={blog.id} 
              className="group bg-white rounded-[2rem] p-4 flex flex-col md:flex-row gap-6 md:gap-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              {/* IMAGEN */}
              <div className="w-full md:w-1/3 lg:w-1/4 h-56 md:h-auto rounded-[1.5rem] overflow-hidden relative shrink-0">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-[#333D29]/90 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {blog.category}
                </div>
              </div>

              {/* CONTENIDO */}
              <div className="flex flex-col justify-center py-2 md:pr-8 grow">
                <div className="flex items-center gap-3 text-xs font-bold text-[#B6AD90] uppercase tracking-wider mb-3">
                  <span>{blog.date}</span>
                  <span className="w-1 h-1 rounded-full bg-[#B6AD90]"/>
                  <span>5 min lectura</span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-[#333D29] mb-3 leading-snug group-hover:text-[#582F0E] transition-colors">
                  {blog.title}
                </h3>
                
                <p className="text-[#656D4A] leading-relaxed mb-6 line-clamp-2 md:line-clamp-none">
                  {blog.excerpt}
                </p>

                <div className="flex items-center gap-2 text-[#582F0E] font-bold text-sm uppercase tracking-wider mt-auto group-hover:underline decoration-2 underline-offset-4 decoration-[#B6AD90]">
                  Leer artículo
                  <IconArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Botón Móvil */}
        <div className="mt-16 text-center md:hidden">
           <Link to="/blog" className="inline-block border-b border-[#333D29] text-[#333D29] font-bold pb-1">
             Explorar el Blog
           </Link>
        </div>

      </div>
    </section>
  );
}

export default BlogPreview;