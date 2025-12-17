import { Link } from "react-router-dom";
import { type Blog } from "../types/blogTypes";
import { getImageUrl } from "../../../utils/imageUtil";
import { motion, type Variants } from "framer-motion";
import { IconPlus, IconArticle, IconEdit, IconTrash, IconArrowRight } from "@tabler/icons-react";

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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 50 }
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#EBECE2] p-4 md:p-8 font-sans pt-24 md:pt-32">
      
      <div className="mx-auto w-full max-w-7xl">

        {/* CABECERA */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#333D29] tracking-tight">
              Diario del <span className="italic font-serif text-[#582F0E]">Camino</span>
            </h1>
            <p className="mt-2 text-[#656D4A] uppercase tracking-widest text-xs font-bold">
              Historias, consejos y guías para tu viaje
            </p>
          </motion.div>

          {canEdit && (
            <Link to="/blog/new">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-full bg-[#582F0E] px-8 py-3 text-sm font-bold text-white shadow-lg transition-colors hover:bg-[#7F4F24]"
              >
                <IconPlus size={18} />
                Nueva Entrada
              </motion.button>
            </Link>
          )}
        </div>

        {/* ESTADO: CARGANDO */}
        {isLoading && (
          <div className="flex h-96 flex-col items-center justify-center text-[#582F0E]">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#333D29] border-t-transparent mb-4" />
            <p className="font-bold text-lg animate-pulse">Cargando historias...</p>
          </div>
        )}

        {/* LISTA DE BLOGS */}
        {!isLoading && blogs && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogs.length === 0 ? (
              <div className="col-span-full py-20 text-center">
                <div className="inline-block p-6 rounded-full bg-white mb-4 shadow-sm">
                  <IconArticle size={48} className="text-[#333D29]/30" />
                </div>
                <p className="text-[#656D4A] font-medium text-lg">No hay entradas publicadas todavía.</p>
              </div>
            ) : (
              blogs.map((blog) => (
                <motion.div
                  key={blog._id}
                  variants={itemVariants}
                  className="group flex flex-col bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-[#B6AD90]/30 h-full"
                >
                  {/* IMAGEN */}
                  <div className="relative h-64 w-full overflow-hidden bg-[#EBECE2]">
                    {blog.image ? (
                      <img
                        src={getImageUrl(blog.image)}
                        alt={blog.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[#A4AC86]">
                        <span className="text-sm font-bold uppercase tracking-widest">Sin imagen</span>
                      </div>
                    )}
                    
                    {/* Badge de Fecha */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#333D29]">
                        {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {/* CONTENIDO */}
                  <div className="flex flex-1 flex-col p-8">
                    <h3
                      className="text-2xl font-bold text-[#333D29] leading-tight mb-3 line-clamp-2 group-hover:text-[#582F0E] transition-colors"
                      title={blog.title}
                    >
                      {blog.title}
                    </h3>

                    <p className="text-[#656D4A] line-clamp-3 mb-6 text-sm font-medium opacity-80 leading-relaxed flex-1">
                      {blog.content}
                    </p>

                    {/* ACCIONES DEL FOOTER */}
                    <div className="mt-auto pt-6 border-t border-[#EBECE2] flex items-center justify-between">
                      <Link
                        to={`/blog/${blog._id}`}
                        className="flex items-center gap-2 text-[#582F0E] font-bold text-sm uppercase tracking-wider group/link"
                      >
                        Leer artículo
                        <IconArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                      </Link>

                      {canEdit && (
                        <div className="flex gap-2">
                          <Link to={`/blog/edit/${blog._id}`}>
                            <button 
                              className="p-2 rounded-full bg-[#EBECE2] text-[#333D29] hover:bg-[#333D29] hover:text-white transition-colors"
                              title="Editar"
                            >
                              <IconEdit size={16} />
                            </button>
                          </Link>
                          <button
                            onClick={() => onDelete(blog._id)}
                            className="p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                            title="Eliminar"
                          >
                            <IconTrash size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};