import { useBlogsQuery } from "../hooks/useBlogsQuery";
import { useDeleteBlogMutation } from "../hooks/useBlogsMutation";
import { useAuth } from "../../auth/context/auth.context";
import { USER_ROLES } from "../../../config/constants";
// Importamos el diseño actualizado
import { BlogListDesign } from "../components/BlogListDesign";

const BlogPage = () => {
  // Lógica de datos
  const { data: blogs, isLoading } = useBlogsQuery();
  const { mutate: deleteBlog } = useDeleteBlogMutation();
  const { user } = useAuth();

  const canEdit =
    user?.role === USER_ROLES.ADMIN || user?.role === USER_ROLES.MODERATOR;

  // Manejador de borrado
  const handleDelete = (id: string) => {
    if (window.confirm("¿Seguro que quieres borrar esta historia?")) {
      deleteBlog(id);
    }
  };

  return (
    <BlogListDesign
      blogs={blogs}
      isLoading={isLoading}
      canEdit={canEdit}
      onDelete={handleDelete}
    />
  );
};

export default BlogPage;