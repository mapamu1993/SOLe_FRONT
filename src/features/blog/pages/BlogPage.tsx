import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useBlogsQuery } from "../hooks/useBlogsQuery";
import { useDeleteBlogMutation } from "../hooks/useBlogsMutation";
import { useAuth } from "../../auth/context/auth.context";
import { USER_ROLES } from "../../../config/constants";

const BlogPage = () => {
  const { data: blogs, isLoading } = useBlogsQuery();
  const { mutate: deleteBlog } = useDeleteBlogMutation();
  const { user } = useAuth();

  const canEdit =
    user?.role === USER_ROLES.ADMIN || user?.role === USER_ROLES.MODERATOR;

  if (isLoading) return <div>Cargando blog...</div>;

  return (
    <div>
      <h1>Blog</h1>
      {canEdit && (
        <RouterLink to="/blog/new">
          <button>+ Crear Entrada</button>
        </RouterLink>
      )}

      <ul>
        {blogs?.map((blog) => (
          <li
            key={blog._id}
            style={{
              marginBottom: "20px",
              borderBottom: "1px solid #eee",
              paddingBottom: "10px",
            }}
          >
            <h3>{blog.title}</h3>
            <p>{blog.content.substring(0, 100)}...</p>
            <RouterLink to={`/blog/${blog._id}`}>Leer más</RouterLink>

            {canEdit && (
              <button
                onClick={() => {
                  if (window.confirm("¿Borrar entrada?")) deleteBlog(blog._id);
                }}
                style={{ marginLeft: "10px", color: "red" }}
              >
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
