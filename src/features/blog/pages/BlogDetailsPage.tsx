import { useBlogByIdQuery } from "../hooks/useBlogsQuery";
import { useParams } from "react-router-dom";
// Importamos el nuevo diseño
import { BlogDetailsDesign } from "../components/BlogDetailsDesign";

const BlogDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  
  // Extraemos isLoading también
  const { data: blog, isLoading, isError } = useBlogByIdQuery(id || "");

  const content = {
    __html: blog?.content?.replace(/\n/g, "<br />") || ""
  };

  //  SI ESTÁ CARGANDO, MOSTRAMOS ESTO
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl font-bold text-[#333D29]">Cargando artículo...</div>
      </div>
    );
  }

  //  SI HUBO ERROR O NO HAY BLOG
  if (isError || !blog) {
    return (
      <div className="p-10 text-center text-red-600">
        No se pudo cargar el blog o no existe.
      </div>
    );
  }

  return (
      <BlogDetailsDesign
      blog={blog}
      isLoading={isLoading}
      isError={isError}
      htmlContent={content}
    />
  );
};

export default BlogDetailsPage;