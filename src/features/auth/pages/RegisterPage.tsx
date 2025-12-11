import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

// Importamos el esquema y el tipo
import {
  registerSchema,
  type RegisterFields,
} from "../../auth/validators/auth.schema";

// Importamos el servicio
import { registerUserService } from "../../auth/services/authService";

// IMPORTANTE: Importamos el diseño nuevo
import { RegisterDesign } from "../components/RegisterDesign";

const RegisterPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFields>({
    resolver: zodResolver(registerSchema),
  });

  // Manejo del input tipo File y su previsualización
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setPreviewUrl(null);
    }
  };

  // Función de envío del formulario
  const onSubmit = async (data: RegisterFields) => {
    setServerError("");
    try {
      // Delegamos la lógica de la petición al servicio
      await registerUserService(data, file);

      // Si todo sale bien, redirigimos
      navigate("/login");
    } catch (error) {
      console.error("Error en petición:", error);
      // Aquí podrías mejorar el manejo de errores si tu backend devuelve un mensaje específico
      setServerError("Ocurrió un error, inténtalo de nuevo.");
    }
  };

  // AQUÍ CONECTAMOS LA LÓGICA CON EL DISEÑO
  return (
    <RegisterDesign 
      register={register}
      errors={errors}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
      serverError={serverError}
      handleFileChange={handleFileChange}
      previewUrl={previewUrl}
    />
  );
};

export default RegisterPage;