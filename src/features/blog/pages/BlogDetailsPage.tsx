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

  // --- RENDERIZAMOS EL DISEÑO ---
  // Pasamos todos los datos necesarios al componente visual
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