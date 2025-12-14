import { useEditBlogMutation } from "../hooks/useBlogsMutation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom"; // Quitamos useNavigate y useSnackbar porque el hook ya los tiene
import {
  createBlogSchema,
  type CreateBlogFields,
} from "../validators/blogSchema";
import { getBlogByIdService } from "../services/blogService"; // Quitamos editBlogService
import { BlogFormDesign } from "../components/BlogFormDesign";
import { IMAGE_URL } from "../../../config/constants";

const EditBlogPage = () => {
  const { id } = useParams<{ id: string }>();
  const [file, setFile] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [loadError, setLoadError] = useState(""); // Cambié el nombre para no confundir con el error de edición

  // 1. AQUÍ USAMOS TU HOOK (El robot que hace el trabajo sucio)
  // Extraemos 'mutate' para disparar la acción y 'isPending' para saber si está cargando
  const { mutate, isPending, error: mutationError } = useEditBlogMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateBlogFields>({
    resolver: zodResolver(createBlogSchema),
  });

  // Carga inicial de datos (Esto está bien, es solo lectura)
  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      try {
        const BlogData = await getBlogByIdService(id);
        // OJO: Si BlogData llega undefined, esto fallará.
        if (BlogData) {
            setValue("title", BlogData.title);
            setValue("content", BlogData.content);
            setCurrentImage(BlogData.image);
        }
      } catch (error) {
        setLoadError("Error al cargar el blog");
      } finally {
        setLoadingData(false);
      }
    };
    fetchBlog();
  }, [id, setValue]);

  // 2. CORREGIMOS EL ONSUBMIT
  const onSubmit = (data: CreateBlogFields) => {
    if (!id) return;
    
    // En lugar de hacer try/catch manual aquí, le pasamos la pelota al hook
    // El hook ya tiene configurado el onSuccess (navegar) y onError (alerta)
    mutate({ id, data, file });
  };

  const formattedExistingImage = currentImage?.startsWith("http")
    ? currentImage
    : currentImage
    ? `${IMAGE_URL}/uploads/blogs/${currentImage}`
    : null;

  if (loadingData) return <div>Cargando...</div>;
  if (loadError) return <div>{loadError}</div>;

  return (
    <BlogFormDesign
      register={register}
      errors={errors}
      // 3. Conectamos el estado de carga del hook
      isSubmitting={isPending} 
      onSubmit={handleSubmit(onSubmit)}
      pageTitle="Editar Blog"
      buttonText="Guardar Cambios"
      // 4. Si el hook devuelve error, lo mostramos (o null)
      serverError={mutationError?.response?.data?.message || ""} 
      onFileChange={(e) => setFile(e.target.files?.[0] || null)}
      currentFile={file}
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
