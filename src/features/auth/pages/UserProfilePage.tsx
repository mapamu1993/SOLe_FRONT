import React from "react";
// 1. IMPORTAMOS useNavigate
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { IMAGE_URL } from "../../../config/constants";
import ProfileCard from "../components/UserProfilePageDesign"; // Asegúrate de que la ruta es correcta

const UserProfilePage: React.FC = () => {
  const { user } = useAuth();
  // 2. INICIALIZAMOS EL HOOK DE NAVEGACIÓN
  const navigate = useNavigate();

  if (!user) return null;

  // --- LÓGICA DE DATOS (IGUAL QUE ANTES) ---
  let profileImageUrl: string | null = user.profilePicture || null;

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
    { label: "Teléfono", value: user.phone || "No proporcionado" },
    { label: "Dirección", value: user.address || "No proporcionado" },
  ];

  // Función existente para editar
  const handleEdit = () => {
    navigate("/profile/edit");
  };

  // 3. NUEVA FUNCIÓN PARA VOLVER AL INICIO
  const handleGoHome = () => {
    // Navega a la ruta raíz "/"
    navigate("/");
  };

  // --- RENDERIZADO DEL DISEÑO ---
  return (
    <ProfileCard
      displayName={displayName}
      role={formateRole}
      initial={initial}
      imageUrl={profileImageUrl}
      details={profileDetails}
      onEdit={handleEdit}
      // 4. PASAMOS LA NUEVA FUNCIÓN AL COMPONENTE
      onGoHome={handleGoHome}
    />
  );
};

export default UserProfilePage;
