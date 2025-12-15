import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";

// 1. Importamos el hook y las utilidades
import { useBlogsQuery } from "../../blog/hooks/useBlogsQuery";
import { getImageUrl } from "../../../utils/imageUtil";

export function BlogPreview() {
  // 2. Obtenemos los datos del servidor
  const { data: blogs, isLoading } = useBlogsQuery();

  // 3. Procesamos los datos con useMemo para no recalcular en cada render
  const recentBlogs = useMemo(() => {
    if (!blogs) return [];

    // a. Ordenamos por fecha (más reciente primero)
    const sorted = [...blogs].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // b. Tomamos los 3 primeros y los transformamos al formato que necesita el diseño
    return sorted.slice(0, 3).map((blog) => {
      // Formatear fecha: Ej "12 Oct"
      const dateObj = new Date(blog.createdAt);
      const day = dateObj.getDate();
      const month = dateObj.toLocaleString("es-ES", { month: "short" });
      const formattedDate = `${day} ${month}`;

      return {
        id: blog._id,
        title: blog.title,
        // Como tu backend no tiene campo "category" aún, ponemos uno por defecto
        category: "Blog",
        // Creamos un resumen cortando el contenido a 100 caracteres
        excerpt: blog.content.substring(0, 100) + "...",
        image: getImageUrl(blog.image),
        date: formattedDate,
      };
    });
  }, [blogs]);

  // Si está cargando, podrías mostrar un spinner, o simplemente mantener la estructura vacía
  // Para que no de un salto visual, renderizamos la sección de todas formas.

  return (
    <section className="w-full py-32 md:py-40 px-4 md:px-6 bg-[#F2F2EF] relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* CABECERA BOTON DE LA DERECHA*/}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[#333D29] tracking-tight">
            Diario del{" "}
            <span className="italic font-serif text-[#582F0E]">Camino</span>
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
          {/* ESTADO DE CARGA */}
          {isLoading && (
            <div className="flex justify-center items-center py-20 text-[#656D4A]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#582F0E] mr-2"></div>
              Cargando últimas entradas...
            </div>
          )}

          {/* SI NO HAY BLOGS */}
          {!isLoading && recentBlogs.length === 0 && (
            <div className="text-center py-10 text-[#656D4A] border border-dashed border-[#A4AC86] rounded-2xl">
              Aún no hay historias publicadas. ¡Pronto habrá novedades!
            </div>
          )}

          {/* BLOGS REALES */}
          {!isLoading &&
            recentBlogs.map((blog) => (
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
                    <span className="w-1 h-1 rounded-full bg-[#B6AD90]" />
                    {/* Calculamos lectura aprox. (200 palabras/min) o lo dejamos estático */}
                    <span>Lectura rápida</span>
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
          <Link
            to="/blog"
            className="inline-block border-b border-[#333D29] text-[#333D29] font-bold pb-1"
          >
            Explorar el Blog
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BlogPreview;
