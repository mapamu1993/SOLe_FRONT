import { Link } from "react-router-dom";
import { type Blog } from "../types/blogTypes";
import { IMAGE_URL } from "../../../config/constants";

interface BlogDetailsDesignProps {
  blog: Blog | undefined;
  isLoading: boolean;
  isError: boolean;
  // Pasamos el contenido ya procesado (HTML) para respetar tu lógica original
  htmlContent: { __html: string };
}

export const BlogDetailsDesign = ({
  blog,
  isLoading,
  isError,
  htmlContent,
}: BlogDetailsDesignProps) => {
  return (
    // FONDO GENERAL (Beige verdoso)
    <div className="min-h-screen w-full bg-[#C2C5AA] p-4 font-sans">
      
      {/* CONTENEDOR PRINCIPAL */}
      <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white shadow-2xl border border-[#A4AC86] overflow-hidden">
        
        {/* ESTADO: CARGANDO */}
        {isLoading && (
          <div className="flex h-96 flex-col items-center justify-center text-[#582F0E]">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#A4AC86] border-t-[#582F0E]" />
            <p className="mt-4 text-lg font-medium">Cargando artículo...</p>
          </div>
        )}

        {/* ESTADO: ERROR O NO EXISTE */}
        {(isError || (!isLoading && !blog)) && (
          <div className="flex h-96 flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 rounded-full bg-red-100 p-4 text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h2 className="text-xl font-bold text-[#333D29]">No pudimos cargar el blog</h2>
            <p className="mt-2 text-[#656D4A]">Es posible que la entrada haya sido eliminada o no exista.</p>
            <Link to="/blog" className="mt-6 rounded-lg bg-[#582F0E] px-6 py-2 text-white hover:bg-[#7F4F24]">
              Volver al Blog
            </Link>
          </div>
        )}

        {/* CONTENIDO DEL BLOG */}
        {!isLoading && !isError && blog && (
          <article>
            {/* Cabecera con Imagen */}
            <div className="relative h-64 w-full bg-[#EBECE2] md:h-96">
              {blog.image ? (
                <img
                  src={blog.image.startsWith('http') ? blog.image : `${IMAGE_URL}/uploads/blogs/${blog.image}`}
                  alt={blog.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[#A4AC86]">
                  <span className="text-lg font-medium">Sin imagen de portada</span>
                </div>
              )}
              
              {/* Botón Flotante Volver */}
              <Link 
                to="/blog" 
                className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-[#582F0E] shadow-lg backdrop-blur-sm transition hover:bg-[#582F0E] hover:text-white"
              >
                &larr; Volver
              </Link>
            </div>

            {/* Cuerpo del Artículo */}
            <div className="p-6 md:p-10">
              <header className="mb-8 border-b border-[#C2C5AA] pb-8">
                <h1 className="text-3xl font-extrabold text-[#333D29] md:text-4xl lg:text-5xl">
                  {blog.title}
                </h1>
                
                {/* Metadatos (Fecha y Autor) */}
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm font-medium text-[#656D4A]">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    {new Date(blog.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  {blog.author && (
                    <>
                      <span className="hidden h-1 w-1 rounded-full bg-[#A4AC86] sm:block"></span>
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        <span>{blog.author.username || blog.author.name || "Autor"}</span>
                      </div>
                    </>
                  )}
                </div>
              </header>

              {/* Contenido HTML */}
              <div 
                className="prose prose-lg max-w-none text-[#333D29] prose-headings:text-[#333D29] prose-a:text-[#582F0E] prose-strong:text-[#333D29]"
                dangerouslySetInnerHTML={htmlContent} 
              />
            </div>
          </article>
        )}
      </div>
    </div>
  );
};