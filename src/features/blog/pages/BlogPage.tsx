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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Blog</h1>
        {canEdit && (
            <RouterLink to="/blog/new">
            <button style={{ padding: "8px 16px", backgroundColor: "#582F0E", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                + Crear Entrada
            </button>
            </RouterLink>
        )}
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {blogs?.map((blog) => (
          <li
            key={blog._id}
            style={{
              marginBottom: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              backgroundColor: "white"
            }}
          >
            <h3 style={{ marginTop: 0 }}>{blog.title}</h3>
            <p>{blog.content.substring(0, 100)}...</p>
            
            <div style={{ marginTop: "10px", display: "flex", gap: "10px", alignItems: "center" }}>
                {/*BOTON PARA TODOS: Leer más */}
                <RouterLink to={`/blog/${blog._id}`} style={{ color: "#582F0E", fontWeight: "bold" }}>
                    Leer más
                </RouterLink>

                {/* Botones SOLO para Admin/Moderador */}
                {canEdit && (
                <>
                    {/* BOTÓN DE EDITAR  */}
                    <RouterLink to={`/blog/edit/${blog._id}`}>
                        <button style={{ cursor: "pointer", color: "blue", background: "none", border: "none", textDecoration: "underline" }}>
                            Editar
                        </button>
                    </RouterLink>

                    {/* BOTÓN DE ELIMINAR */}
                    <button
                        onClick={() => {
                            if (window.confirm("¿Borrar entrada?")) deleteBlog(blog._id);
                        }}
                        style={{ cursor: "pointer", color: "red", background: "none", border: "none", textDecoration: "underline" }}
                    >
                        Eliminar
                    </button>
                </>
                )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPage;