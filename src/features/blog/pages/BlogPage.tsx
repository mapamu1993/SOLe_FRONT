import { useBlogsQuery } from "../hooks/useBlogsQuery";
import { useDeleteBlogMutation } from "../hooks/useBlogsMutation";
import { useAuth } from "../../auth/context/auth.context";
import { USER_ROLES } from "../../../config/constants";
// Importamos el nuevo diseño
import { BlogListDesign } from "../components/BlogListDesign";

const BlogPage = () => {
  // --- LÓGICA INTACTA ---
  const { data: blogs, isLoading } = useBlogsQuery();
  const { mutate: deleteBlog } = useDeleteBlogMutation();
  const { user } = useAuth();

  const canEdit =
    user?.role === USER_ROLES.ADMIN || user?.role === USER_ROLES.MODERATOR;

  // Handler para mantener la lógica del confirm sin ensuciar el diseño visual
  const handleDelete = (id: string) => {
    if (window.confirm("¿Borrar entrada?")) {
      deleteBlog(id);
    }
  };

  // --- RENDERIZAMOS EL DISEÑO ---
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