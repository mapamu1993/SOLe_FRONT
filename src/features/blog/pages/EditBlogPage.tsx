// Nota: Importamos el hook aunque la lógica actual usa el servicio directamente (ver reporte de fallos)
import { useEditBlogMutation } from "../hooks/useBlogsMutation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams, Link as RouterLink } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  createBlogSchema,
  type CreateBlogFields,
} from "../validators/blogSchema";
import { getBlogByIdService, editBlogService } from "../services/blogService";

const EditBlogPage = () => {
  const { id } = useParams<{ id: string }>();
  const [file, setFile] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateBlogFields>({
    resolver: zodResolver(createBlogSchema),
  });

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      try {
        // Llamada directa al servicio según tu lógica actual
        const BlogData = await getBlogByIdService(id);

        // Cuidado: getBlogByIdService en tu código devuelve Promise<Blog[]> o Promise<Blog>.
        // Si devuelve array, esto fallará. Asumimos que devuelve un objeto Blog.
        setValue("title", BlogData.title);
        setValue("content", BlogData.content);
        setCurrentImage(BlogData.image);
      } catch (error) {
        setError("Error al cargar el blog");
      } finally {
        setLoadingData(false);
      }
    };
    fetchBlog();
  }, [id, setValue]);

  const onSubmit = async (data: CreateBlogFields) => {
    if (!id) return;
    try {
      // Lógica actual: Llamada directa al servicio
      await editBlogService(id, data, file);
      enqueueSnackbar("Blog editado correctamente", { variant: "success" });
      navigate("/blog");
    } catch (error: any) {
      setError(error.response?.data?.message || "Error al editar blog");
    }
  };

  if (loadingData) return <div>Cargando datos para editar...</div>;

  return (
    <div>
      <h1>Editar Blog</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
        }}
      >
        <div>
          <label>Título:</label>
          <input type="text" {...register("title")} />
          {errors.title && (
            <span style={{ color: "red" }}>{errors.title.message}</span>
          )}
        </div>

        <div>
          <label>Contenido:</label>
          <textarea rows={5} {...register("content")} />
          {errors.content && (
            <span style={{ color: "red" }}>{errors.content.message}</span>
          )}
        </div>

        <div>
          <label>Imagen Actual:</label>
          {currentImage ? (
            <p>Tiene imagen asignada: {currentImage}</p>
          ) : (
            <p>Sin imagen</p>
          )}
          <label>Cambiar Imagen:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        <button type="submit">Guardar Cambios</button>
      </form>

      <br />
      <RouterLink to="/blog">Cancelar</RouterLink>
    </div>
  );
};

export default EditBlogPage;
