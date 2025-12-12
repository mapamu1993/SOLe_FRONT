import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
// CORRECCIÓN 1: Importar el esquema (valor) además del tipo
import { profileSchema, type ProfileFields } from "../validators/authSchema";
import { useAuth } from "../context/auth.context";
import useUpdateProfile from "../hooks/useUpdateProfile";
import { getUserProfileUrl } from "../utils/userUtil";

// IMPORTAMOS EL DISEÑO
import UpdateProfileDesign from "../components/UpdateProfilePageDesign"; // <--- Ajusta la ruta si es necesario

const UpdateProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { mutate, isPending } = useUpdateProfile();

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Hook del formulario
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFields>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      name: "",
      lastName: "",
      address: "",
      phone: "",
    },
  });

  // Cargar datos iniciales
  useEffect(() => {
    if (user) {
      reset({
        username: user.username ?? "",
        name: user.name ?? "",
        lastName: user.lastName ?? "",
        address: user.address ?? "",
        phone: user.phone ?? "",
      });
      const initialUrl = getUserProfileUrl(user.profilePicture);
      if (initialUrl) setPreviewUrl(initialUrl);
    }
  }, [user, reset]);

  // Manejar cambio de archivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      const originalUrl = getUserProfileUrl(user?.profilePicture);
      setPreviewUrl(originalUrl || null);
    }
  };

  // Enviar formulario
  const onSubmit = (data: ProfileFields) => {
    mutate(
      { data, file },
      {
        onSuccess: () => {
          navigate("/profile");
        },
      }
    );
  };

  // Funciones de navegación
  const handleCancel = () => navigate("/profile");
  const handleGoHome = () => navigate("/");

  // Calculamos la inicial para el avatar por defecto
  const initial = user?.username ? user.username[0].toUpperCase() : "U";

  // Renderizamos el componente de DISEÑO pasándole toda la lógica
  return (
    <UpdateProfileDesign
      register={register}
      errors={errors}
      isPending={isPending}
      previewUrl={previewUrl}
      initial={initial}
      onFileChange={handleFileChange}
      onSubmit={handleSubmit(onSubmit)} // Importante pasar handleSubmit(onSubmit)
      onCancel={handleCancel}
      onGoHome={handleGoHome}
    />
  );
};

export default UpdateProfilePage;
