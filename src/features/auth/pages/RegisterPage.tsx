import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema, type RegisterFields } from "../validators/authSchema";

import { registerUserService } from "../../auth/services/authService";

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setPreviewUrl(null);
    }
  };

  const onSubmit = async (data: RegisterFields) => {
    setServerError("");
    try {
      await registerUserService(data, file);

      navigate("/login");
    } catch (error) {
      console.error("Error en petición:", error);
      setServerError("Ocurrió un error, inténtalo de nuevo.");
    }
  };

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