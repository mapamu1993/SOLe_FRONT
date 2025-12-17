import React from "react";

interface DetailItem {
  label: string;
  value: string | undefined | null;
}

interface ProfileCardProps {
  displayName: string;
  role: string;
  initial: string;
  imageUrl?: string | null;
  details: DetailItem[];
  onEdit?: () => void;
  onGoHome?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  displayName,
  role,
  initial,
  imageUrl,
  details,
  onEdit,
  onGoHome,
}) => {
  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4 font-sans">
      {/* Tarjeta Principal */}
      <div className="bg-brand-card shadow-2xl rounded-2xl overflow-hidden max-w-lg w-full border border-gray-200 flex flex-col">
        {/* Banner Superior */}
        <div className="h-32 bg-gradient-to-r from-brand-primary to-brand-secondary"></div>

        <div className="relative px-6 pb-8 flex-1">
          {/* Avatar / Foto de Perfil */}
          <div className="relative -mt-16 mb-5 flex justify-center">
            <div className="h-32 w-32 rounded-full ring-4 ring-white bg-white shadow-md flex items-center justify-center overflow-hidden">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={`Perfil de ${displayName}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-4xl font-bold text-brand-primary">
                  {initial}
                </span>
              )}
            </div>
          </div>

          {/* Cabecera: Nombre y Rol */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
              {displayName}
            </h1>
            <div className="mt-2">
              <span className="bg-blue-50 text-brand-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-100">
                {role}
              </span>
            </div>
          </div>

          {/* Lista de Detalles */}
          <div className="space-y-3 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
            {details.map((detail, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2 border-b border-gray-100 last:border-0 hover:bg-white transition-colors rounded-md"
              >
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {detail.label}
                </span>
                <span className="text-gray-800 font-medium text-sm mt-1 sm:mt-0">
                  {detail.value}
                </span>
              </div>
            ))}
          </div>

          {/* --- ZONA DE BOTONES --- */}

          <div className="mt-8 flex flex-col gap-3">
            {/* Boton Principal - Estilo Relleno */}
            <button
              onClick={onEdit}
              className="w-full bg-brand-primary hover:opacity-90 active:scale-95 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Editar Perfil</span>
            </button>

            {/* BOTON SECUNDARIO */}
            <button
              onClick={onGoHome}
              className="w-full bg-white text-brand-primary border-2 border-brand-primary hover:bg-blue-50 active:scale-95 font-bold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Volver al Inicio</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
