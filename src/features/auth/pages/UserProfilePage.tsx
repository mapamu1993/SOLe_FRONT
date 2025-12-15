import React from "react";
// 1. IMPORTAMOS useNavigate
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import {
  getUserProfileUrl,
  formatUserRole,
  getDisplayName,
  getUserInitials,
} from "../../../utils/imageUtil";

const UserProfilePage: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  //IMPLEMENTAMOS EL UTIL
  const profileImageUrl =
    getUserProfileUrl(user.profilePicture) ||
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const displayName = getDisplayName(user);
  const formattedRole = formatUserRole(user.role);
  const initial = getUserInitials(user.name, user.username);

  const profileDetails = [
    {
      label: "Usuario",
      value: user.username,
    },
    {
      label: "Email",
      value: user.email,
    },
    {
      label: "Rol",
      value: formattedRole,
    },
    {
      label: "Teléfono",
      value: user.phone || "No proporcionado",
    },
    {
      label: "Dirección",
      value: user.address || "No proporcionado",
    },
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
    <div className="flex min-h-screen items-center justify-center bg-[#C2C5AA] p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl border border-[#A4AC86]">
        {/* CABECERA PERFIL */}
        <div className="bg-[#EBECE2] p-8 text-center">
          <div className="relative mx-auto mb-4 h-32 w-32">
            <img
              src={profileImageUrl}
              alt={`Perfil de ${displayName}`}
              className="h-full w-full rounded-full object-cover shadow-lg border-4 border-white"
            />
          </div>
          <h1 className="text-2xl font-bold text-[#333D29]">{displayName}</h1>
          <div className="mt-2 flex justify-center gap-2">
            <span className="rounded-full bg-[#A4AC86] px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">
              {initial}
            </span>
          </div>
        </div>

        {/* DETALLES */}
        <div className="p-6">
          <h2 className="mb-4 border-b border-[#C2C5AA] pb-2 text-lg font-bold text-[#582F0E]">
            Información Personal
          </h2>

          <ul className="space-y-4">
            {profileDetails.map((detail, index) => (
              <li
                key={index}
                className="flex justify-between border-b border-dashed border-[#EBECE2] pb-2 last:border-0"
              >
                <span className="font-semibold text-[#656D4A]">
                  {detail.label}:
                </span>
                <span className="text-right font-medium text-[#333D29]">
                  {detail.value}
                </span>
              </li>
            ))}
          </ul>

          {/* BOTONES DE ACCIÓN */}
          <div className="mt-8 flex flex-col gap-3">
            <RouterLink
              to="/update"
              className="block w-full rounded-lg border border-[#582F0E] py-2 text-center text-sm font-bold text-[#582F0E] transition-colors hover:bg-[#582F0E] hover:text-white"
            >
              Editar Información
            </RouterLink>

            <RouterLink
              to="/orders"
              className="block w-full rounded-lg bg-[#582F0E] py-2 text-center text-sm font-bold text-white shadow-md transition-transform hover:scale-[1.02] hover:bg-[#7F4F24]"
            >
              Ver Mis Pedidos
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
