import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileFields } from "../validators/authSchema";
import { useAuth } from "../context/auth.context";
import useUpdateProfile from "../hooks/useUpdateProfile";
import { getUserProfileUrl } from "../utils/userUtil";
// Importamos el componente de diseño que creamos antes
import UpdateProfileDesign from "../components/UpdateProfilePageDesign";

const UpdateProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { mutate, isPending } = useUpdateProfile();

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Configuración del formulario con Zod
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

  // Cargar los datos del usuario en el formulario al entrar
  useEffect(() => {
    if (user) {
      reset({
        username: user.username ?? "",
        name: user.name ?? "",
        lastName: user.lastName ?? "",
        address: user.address ?? "",
        phone: user.phone ?? "",
      });
      const initialUrl = getUserProfileUrl(user.image);
      if (initialUrl) setPreviewUrl(initialUrl);
    }
  }, [user, reset]);

  // Manejar la selección de nueva foto de perfil
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      const originalUrl = getUserProfileUrl(user?.image);
      setPreviewUrl(originalUrl || null);
    }
  };

  // Enviar los cambios al backend
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

  // --- FUNCIONES DE NAVEGACIÓN ---

  // 1. Volver al perfil sin guardar
  const handleCancel = () => navigate("/profile");

  // 2. Volver a la página principal (Home)
  const handleGoHome = () => navigate("/");

  // 3. Ir a cambiar contraseña
  const handleChangePassword = () => {
    navigate("/resetpassword", { state: { email: user?.email } });
  };

  // Obtener inicial para el avatar por defecto
  const initial = user?.username ? user.username[0].toUpperCase() : "U";

  // Renderizamos el diseño pasando toda la lógica
  return (
    <UpdateProfileDesign
      register={register}
      errors={errors}
      isPending={isPending}
      previewUrl={previewUrl}
      initial={initial}
      onFileChange={handleFileChange}
      onSubmit={handleSubmit(onSubmit)}
      onCancel={handleCancel}
      onGoHome={handleGoHome}
      onChangePassword={handleChangePassword}
    />
  );
};

export default UpdateProfilePage;
