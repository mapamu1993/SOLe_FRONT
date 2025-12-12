import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { USER_ROLES } from "../../../config/constants";
import { useBlogsQuery } from "../hooks/useBlogsQuery";
import { useAuth } from "../../auth/context/auth.context";
import { useDeleteBlogMutation } from "../hooks/useBlogsMutation";

const BlogPage = () => {
  const { user } = useAuth();
  const { data: blogs } = useBlogsQuery();
  const { mutate: deleteBlog } = useDeleteBlogMutation();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  //permisos:
  const isAdminOrModerator =
    user?.role === USER_ROLES.ADMIN || user?.role === USER_ROLES.MODERATOR;
  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };
  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteBlog(deleteId);
      setDeleteId(null);
    }
  };

  //OJO: NO USEIS ESTOS RETURNS. SON PARA QUE SEPAIS QUE ESTAN AQUI.
  //USAD LO QUE FALTE DE ARRIBA AL HACER EL FORMULARIO ETC.
  return (
    <div>
      <h2>Blog</h2>
      <ul>
        {blogs?.map((blog) => (
          <li key={blog.id}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            {isAdminOrModerator && (
              <button onClick={() => handleDeleteClick(blog.id)}>
                Eliminar
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPage;
