import { useBlogByIdQuery } from "../hooks/useBlogsQuery";
import { useParams } from "react-router-dom";

const BlogDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  
  // Extraemos isLoading también
  const { data: blog, isLoading, isError } = useBlogByIdQuery(id || "");

  const content = {
    __html: blog?.content?.replace(/\n/g, "<br />") || ""
  };

  // 1. SI ESTÁ CARGANDO, MOSTRAMOS ESTO
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl font-bold text-[#333D29]">Cargando artículo...</div>
      </div>
    );
  }

  // 2. SI HUBO ERROR O NO HAY BLOG
  if (isError || !blog) {
    return (
      <div className="p-10 text-center text-red-600">
        No se pudo cargar el blog o no existe.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-4xl font-bold text-[#333D29]">{blog.title}</h1>
      
      {/* Opcional: Mostrar imagen si la tiene */}
      {blog.image && (
          <img 
            src={blog.image.startsWith('http') ? blog.image : `http://localhost:3000/uploads/blogs/${blog.image}`} 
            alt={blog.title}
            className="mb-6 w-full rounded-lg object-cover shadow-md"
          />
      )}

      <div 
        className="prose prose-lg text-[#333D29]" // clases para formatear texto si usas tailwind typography
        dangerouslySetInnerHTML={content} 
      />
    </div>
  );
};

export default BlogDetailsPage;