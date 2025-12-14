import { useCreateBlogMutation } from "../hooks/useBlogsMutation";
import { useForm } from "react-hook-form";
import {
  createBlogSchema,
  type CreateBlogFields,
} from "../validators/blogSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
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
      setLocalError("Por favor, selecciona una imagen válida");
      return;
    }
    mutate({ data, file });
  };




// (COMPONENTE BLOGFROMDESIGN) 

  // SOLO CAMBIA EL RETURN:
  return (
    <BlogFormDesign
      register={register}
      errors={errors}
      // Si usas isPending o isSubmitting en tu lógica, ponlo aquí:
      isSubmitting={isPending} // O {isPending} si usas el mutation hook
      onSubmit={handleSubmit(onSubmit)}
      
      // Textos
      pageTitle="Crear Nuevo Blog"
      buttonText="Publicar Entrada"
      serverError={localError} // Usamos tu variable de estado localError
      
      // Archivos (Conectamos tu setFile con el diseño)
      onFileChange={(e) => setFile(e.target.files?.[0] || null)}
      currentFile={file}
    />
  );
};

export default CreateBlogPage;


 {/* //OJO: NO USEIS ESTOS RETURNS. SON PARA QUE SEPAIS QUE ESTAN AQUI.
  //USAD LO QUE FALTE DE ARRIBA AL HACER EL FORMULARIO ETC.
  return (
    <div>
      <h1>Crear Nueva Entrada</h1>
      {localError && <p style={{ color: "red" }}>{localError}</p>}

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
          <label>Imagen:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        <button type="submit" disabled={isPending}>
          {isPending ? "Creando..." : "Publicar Blog"}
        </button>
      </form>

      <br />
      <RouterLink to="/blog">Cancelar</RouterLink>
    </div>
  );
};

export default CreateBlogPage;
*/}