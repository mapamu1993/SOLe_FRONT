import { useEditBlogMutation } from "../hooks/useBlogsMutation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import {
  createBlogSchema,
  type CreateBlogFields,
} from "../validators/blogSchema";
import { getBlogByIdService } from "../services/blogService";
import { BlogFormDesign } from "../components/BlogFormDesign";
import { IMAGE_URL } from "../../../config/constants";

const EditBlogPage = () => {
  const { id } = useParams<{ id: string }>();
  const [file, setFile] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [loadError, setLoadError] = useState("");

  

  const { mutate, isPending, error: mutationError } = useEditBlogMutation();

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
        const BlogData = await getBlogByIdService(id);
        
        if (BlogData) {
            setValue("title", BlogData.title);
            setValue("content", BlogData.content);
            setCurrentImage(BlogData.image);
        }
      } catch (error) {
        setLoadError("No pudimos cargar la entrada para editar.");
      } finally {
        setLoadingData(false);
      }
    };
    fetchBlog();
  }, [id, setValue]);

  const onSubmit = (data: CreateBlogFields) => {
    if (!id) return;
    mutate({ id, data, file });
  };

  // Construir la URL de la imagen existente
  const formattedExistingImage = (() => {
    if (!currentImage) return null;
    
    // Si es una URL completa (Firebase/Externa), úsala
    if (currentImage.startsWith("http")) {
      return currentImage;
    }
    
    if (currentImage.includes("/") || currentImage.match(/\.(jpeg|jpg|png|webp)$/i)) {
        return `${IMAGE_URL}/uploads/blogs/${currentImage}`;
    }

    return null; 
  })();

  if (loadingData) return (
    <div className="flex h-screen items-center justify-center bg-[#EBECE2]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#333D29] border-t-transparent"></div>
    </div>
  );
  
  if (loadError) return <div className="p-8 text-center text-red-600 font-bold">{loadError}</div>;

  return (
    <BlogFormDesign
      register={register}
      errors={errors}
      isSubmitting={isPending} 
      onSubmit={handleSubmit(onSubmit)}
      
      // Textos personalizados para Editar
      pageTitle="Editando Historia"
      buttonText="Guardar Cambios"
      serverError={mutationError?.response?.data?.message || ""} 
      
      onFileChange={(e) => setFile(e.target.files?.[0] || null)}
      currentFile={file}
      existingImageUrl={formattedExistingImage}
    />
  );
};

export default EditBlogPage;