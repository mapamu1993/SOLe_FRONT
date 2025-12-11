import React from "react";
// import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { IMAGE_URL } from "../../../config/constants";
import ProfileCard from "../components/UserProfilePageDesign"; // Asegúrate de que la ruta al componente es correcta

const UserProfilePage: React.FC = () => {
  const { user } = useAuth();

  // 1. SEGURIDAD: Si no hay usuario logueado, no renderizamos nada (o podrías poner un <Loading />)
  if (!user) return null;

  // 2. LÓGICA DE DATOS REALES
  let profileImageUrl: string | null = user.profilePicture || null;

  // Si la imagen viene del backend (no es una URL externa), le añadimos la ruta base
  if (profileImageUrl && !profileImageUrl.startsWith("http")) {
    profileImageUrl = `${IMAGE_URL}/uploads/users/${profileImageUrl}`;
  }

  const displayName = user.name || user.username || "Usuario";

  const initial =
    user.name && user.name.length > 0
      ? user.name[0]
      : user.username
      ? user.username[0]
      : "U";

  const formateRole =
    user.role && user.role.length > 0
      ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
      : "Usuario";

  const profileDetails = [
    { label: "Usuario", value: user.username },
    { label: "Email", value: user.email },
    { label: "Rol", value: formateRole },
    { label: "Teléfono", value: user.phone || "No proporcionado" },
    { label: "Dirección", value: user.address || "No proporcionado" },
  ];

  const handleEdit = () => {
    // Aquí pondrás la lógica para ir a la página de edición más adelante
    console.log("Navegar a editar perfil...");
  };

  // 3. RENDERIZADO DEL DISEÑO
  return (
    <ProfileCard
      displayName={displayName}
      role={formateRole}
      initial={initial}
      imageUrl={profileImageUrl}
      details={profileDetails}
      onEdit={handleEdit}
    />
  );
};

export default UserProfilePage;
