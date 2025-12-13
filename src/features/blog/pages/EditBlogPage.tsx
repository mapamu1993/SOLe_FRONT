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

const EditBlogPage = () => {
  const { id } = useParams<{ id: string }>();
  const [file, setFile] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  //config del form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateBlogFields>({
    resolver: zodResolver(createBlogSchema),
  });
  //carga inicial de datos
  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) {
        return;
      }
      try {
        const BlogData = await getBlogByIdService(id);
        setValue("title", BlogData.title);
        setValue("content", BlogData.content);
        setCurrentImage(BlogData.image);
      } catch (error) {
        setError("Error al cargar el blog");
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
      navigate("/blog");
    } catch (error: any) {
      setError(error.response?.data?.message || "Error al editar blog");
    }
  };


  // SOLO CAMBIA EL RETURN:
  return (
    <BlogFormDesign
      register={register}
      errors={errors}
      isSubmitting={false} // O {isPending}
      onSubmit={handleSubmit(onSubmit)}
      
      // Textos
      pageTitle="Editar Blog"
      buttonText="Guardar Cambios"
      serverError={error} // Usamos tu variable de error
      
      // Archivos
      onFileChange={(e) => setFile(e.target.files?.[0] || null)}
      currentFile={file}
      
    />
  );
};

export default EditBlogPage;



 {/* //OJO: NO USEIS ESTOS RETURNS. SON PARA QUE SEPAIS QUE ESTAN AQUI.
  //USAD LO QUE FALTE DE ARRIBA AL HACER EL FORMULARIO ETC.
  return (
    <div>
      <h1>Editar Blog</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("title")} />
        <textarea {...register("content")} />
        <input type="file" onChange={(e) => setFile()} />
        <button type="submit">Editar</button>
      </form>
    </div>
  );
};*/}
