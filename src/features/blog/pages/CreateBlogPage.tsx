import { useCreateBlogMutation } from "../hooks/useBlogsMutation";
import { useForm } from "react-hook-form";
import {
  createBlogSchema,
  type CreateBlogFields,
} from "../validators/blogSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { BlogFormDesign } from "../components/BlogFormDesign";

const CreateBlogPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [localError, setLocalError] = useState("");
  const { mutate, isPending } = useCreateBlogMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBlogFields>({
    resolver: zodResolver(createBlogSchema),
  });

  const onSubmit = (data: CreateBlogFields) => {
    setLocalError("");
    if (!file) {
      setLocalError("Una imagen vale más que mil palabras. Por favor, sube una.");
      return;
    }
    mutate({ data, file });
  };

  return (
    <BlogFormDesign
      register={register}
      errors={errors}
      isSubmitting={isPending} 
      onSubmit={handleSubmit(onSubmit)}
      
      pageTitle="Nueva Historia"
      buttonText="Publicar Entrada"
      serverError={localError} 
      
      onFileChange={(e) => setFile(e.target.files?.[0] || null)}
      currentFile={file}
    />
  );
};

export default CreateBlogPage;