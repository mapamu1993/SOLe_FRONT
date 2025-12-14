import { Link } from "react-router-dom";
import { type Blog } from "../types/blogTypes";
import { IMAGE_URL } from "../../../config/constants";

interface BlogListDesignProps {
  blogs: Blog[] | undefined;
  isLoading: boolean;
  canEdit: boolean;
  onDelete: (id: string) => void;
}

export const BlogListDesign = ({
  blogs,
  isLoading,
  canEdit,
  onDelete,
}: BlogListDesignProps) => {
  return (
    // FONDO GENERAL (Beige verdoso)
    <div className="min-h-screen w-full bg-[#C2C5AA] p-4 font-sans">
      
      {/* CONTENEDOR PRINCIPAL */}
      <div className="mx-auto w-full max-w-7xl rounded-2xl bg-white p-6 shadow-2xl border border-[#A4AC86] sm:p-8">
        
        {/* CABECERA */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#C2C5AA] pb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#333D29]">Nuestro Blog</h1>
            <p className="mt-2 text-[#656D4A]">
              Noticias, consejos y artículos de interés
            </p>
          </div>

          {canEdit && (
            <Link to="/blog/new">
              <button className="rounded-lg bg-[#582F0E] px-6 py-3 text-sm font-bold text-white shadow-md transition-transform hover:scale-105 hover:bg-[#7F4F24]">
                + Crear Entrada
              </button>
            </Link>
          )}
        </div>

        {/* ESTADO: CARGANDO */}
        {isLoading && (
          <div className="flex h-64 flex-col items-center justify-center text-[#582F0E]">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#A4AC86] border-t-[#582F0E]" />
            <p className="mt-4 font-medium">Cargando artículos...</p>
          </div>
        )}

        {/* LISTA DE BLOGS */}
        {!isLoading && blogs && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.length === 0 ? (
              <div className="col-span-full py-12 text-center text-[#656D4A]">
                <p>No hay entradas publicadas todavía.</p>
              </div>
            ) : (
              blogs.map((blog) => (
                // TARJETA DE BLOG
                <div
                  key={blog._id}
                  className="flex flex-col overflow-hidden rounded-xl border border-[#A4AC86] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Imagen (Si existe) */}
                  <div className="relative h-48 w-full overflow-hidden bg-[#EBECE2]">
                    {blog.image ? (
                      <img
                        src={blog.image.startsWith('http') ? blog.image : `${IMAGE_URL}/uploads/blogs/${blog.image}`}
                        alt={blog.title}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[#A4AC86]">
                        <span className="text-sm">Sin imagen de portada</span>
                      </div>
                    )}
                  </div>

                  {/* Contenido */}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-2 text-xl font-bold text-[#333D29] line-clamp-2" title={blog.title}>
                      {blog.title}
                    </h3>
                    
                    <p className="mb-4 flex-1 text-sm text-[#656D4A] line-clamp-3">
                      {blog.content}
                    </p>

                    {/* Acciones */}
                    <div className="flex items-center justify-between border-t border-[#EBECE2] pt-4">
                      <Link
                        to={`/blog/${blog._id}`}
                        className="text-sm font-bold text-[#582F0E] hover:underline"
                      >
                        Leer más &rarr;
                      </Link>

                      {canEdit && (
                        <div className="flex items-center gap-3">
                          <Link
                            to={`/blog/edit/${blog._id}`}
                            className="text-sm font-medium text-blue-600 hover:text-blue-800"
                          >
                            Editar
                          </Link>
                          <button
                            onClick={() => onDelete(blog._id)}
                            className="text-sm font-medium text-red-600 hover:text-red-800"
                          >
                            Eliminar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};