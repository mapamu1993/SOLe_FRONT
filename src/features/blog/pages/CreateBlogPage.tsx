import { useCreateBlogMutation } from "../hooks/useBlogsMutation";
import { useForm } from "react-hook-form";
import {
  createBlogSchema,
  type CreateBlogFields,
} from "../validators/blogSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const CreateBlogPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const { localError, setLocalError } = useState("");
  const { mutate } = useCreateBlogMutation();
  //el register nos conecta con inputs de html, handlesubmit envuelve la logica con el envio, formstate error contiene errores de validacion si no se cumple lo de zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBlogFields>({
    resolver: zodResolver(createBlogSchema),
  });
  //logica para el submit
  const onSubmit = (data: CreateBlogFields) => {
    setLocalError("");
    if (!file) {
      setLocalError("Por favor, selecciona una imagen valida");
      return;
    }
    mutate({
      data,
      file,
    });
  };

  //OJO: NO USEIS ESTOS RETURNS. SON PARA QUE SEPAIS QUE ESTAN AQUI.
  //USAD LO QUE FALTE DE ARRIBA AL HACER EL FORMULARIO ETC.
  return (
    <div>
      <h2>Crear Blog</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("title")} />
        <input type="text" {...register("content")} />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default CreateBlogPage;
