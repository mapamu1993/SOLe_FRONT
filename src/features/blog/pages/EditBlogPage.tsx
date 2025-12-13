import { useEditBlogMutation } from "../hooks/useBlogsMutation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  createBlogSchema,
  type CreateBlogFields,
} from "../validators/blogSchema";
import { getBlogByIdService, editBlogService } from "../services/blogService";
import { BlogFormDesign } from "../components/BlogFormDesign";
// IMPORTANTE: Recuperamos esta importación para que funcione la previsualización
import { IMAGE_URL } from "../../../config/constants";

const EditBlogPage = () => {
  const { id } = useParams<{ id: string }>();
  const [file, setFile] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // config del form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateBlogFields>({
    resolver: zodResolver(createBlogSchema),
  });

  // carga inicial de datos
  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      try {
        const BlogData = await getBlogByIdService(id);
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
      await editBlogService(id, data, file);
      enqueueSnackbar("Blog editado correctamente", { variant: "success" });
      navigate("/blogs");
    } catch (error: any) {
      setError(error.response?.data?.message || "Error al editar blog");
    }
  };

  // Lógica para mostrar la imagen antigua correctamente
  const formattedExistingImage = currentImage?.startsWith("http")
    ? currentImage
    : currentImage
    ? `${IMAGE_URL}/uploads/blogs/${currentImage}`
    : null;

  return (
    <BlogFormDesign
      register={register}
      errors={errors}
      isSubmitting={false}
      onSubmit={handleSubmit(onSubmit)}
      
      // Textos
      pageTitle="Editar Blog"
      buttonText="Guardar Cambios"
      serverError={error}
      
      // Archivos
      onFileChange={(e) => setFile(e.target.files?.[0] || null)}
      currentFile={file}
      
      // Pasamos la imagen antigua formateada
      existingImageUrl={formattedExistingImage}
    />
  );
};

export default EditBlogPage;


 {/* //OJO: NO USEIS ESTOS RETURNS. SON PARA QUE SEPAIS QUE ESTAN AQUI.
  //USAD LO QUE FALTE DE ARRIBA AL HACER EL FORMULARIO ETC.
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
};*/}
