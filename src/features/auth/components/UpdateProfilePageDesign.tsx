import React from "react";
import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import { type ProfileFields } from "../validators/authSchema";

// Icono de cámara
const CameraIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

// Icono de Candado (Para contraseña)
const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

interface UpdateProfileDesignProps {
  register: UseFormRegister<ProfileFields>;
  errors: FieldErrors<ProfileFields>;
  isPending: boolean;
  previewUrl: string | null;
  initial: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  onGoHome: () => void;
  onChangePassword: () => void;
  // ELIMINADO: onChangeEmail
}

const UpdateProfileDesign: React.FC<UpdateProfileDesignProps> = ({
  register,
  errors,
  isPending,
  previewUrl,
  initial,
  onFileChange,
  onSubmit,
  onCancel,
  onGoHome,
  onChangePassword,
  // ELIMINADO: onChangeEmail
}) => {
  // CLASES DE ESTILO
  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-gray-800";
  const labelClass =
    "block text-xs font-bold text-gray-700 uppercase mb-1 tracking-wide";
  const errorClass = "text-red-500 text-xs mt-1 font-medium";

  // Estilo para el botón de seguridad
  const securityBtnClass =
    "flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg border border-gray-300 bg-white text-gray-600 font-semibold hover:bg-gray-50 hover:text-brand-primary hover:border-brand-primary transition-all text-sm shadow-sm";

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4 font-sans">
      <div className="bg-brand-card shadow-2xl rounded-2xl overflow-hidden max-w-2xl w-full border border-gray-200 flex flex-col">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-brand-primary to-brand-secondary relative">
          <button
            type="button"
            onClick={onCancel}
            className="absolute top-4 left-4 text-white/80 hover:text-white font-semibold text-sm flex items-center gap-1 transition-colors bg-black/10 px-3 py-1 rounded-full hover:bg-black/20"
          >
            ← Volver
          </button>
        </div>

        <div className="relative px-8 pb-8 flex-1">
          <form onSubmit={onSubmit}>
            {/* Foto Avatar */}
            <div className="relative -mt-16 mb-8 flex justify-center">
              <div className="relative group">
                <div className="h-32 w-32 rounded-full ring-4 ring-white bg-white shadow-md flex items-center justify-center overflow-hidden">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl font-bold text-brand-primary">
                      {initial}
                    </span>
                  )}
                </div>
                <label
                  htmlFor="file-upload"
                  className="absolute bottom-0 right-0 bg-brand-primary hover:bg-blue-700 text-white p-2 rounded-full shadow-lg cursor-pointer transition-colors ring-2 ring-white z-10"
                >
                  <CameraIcon />
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  className="hidden"
                />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 text-center mb-6 tracking-tight">
              Editar Información
            </h1>

            {/* CAMPOS DEL FORMULARIO */}
            <div className="space-y-5 mb-8">
              <div>
                <label className={labelClass}>Usuario</label>
                <input
                  type="text"
                  {...register("username")}
                  className={inputClass}
                  placeholder="Nombre de usuario"
                />
                {errors.username && (
                  <p className={errorClass}>{errors.username.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Nombre</label>
                  <input
                    type="text"
                    {...register("name")}
                    className={inputClass}
                  />
                  {errors.name && (
                    <p className={errorClass}>{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Apellido</label>
                  <input
                    type="text"
                    {...register("lastName")}
                    className={inputClass}
                  />
                  {errors.lastName && (
                    <p className={errorClass}>{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Teléfono</label>
                  <input
                    type="text"
                    {...register("phone")}
                    className={inputClass}
                  />
                  {errors.phone && (
                    <p className={errorClass}>{errors.phone.message}</p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Dirección</label>
                  <input
                    type="text"
                    {...register("address")}
                    className={inputClass}
                  />
                  {errors.address && (
                    <p className={errorClass}>{errors.address.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* --- SECCIÓN SEGURIDAD (SOLO PASSWORD) --- */}
            <div className="mb-8">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-100 pb-1">
                Seguridad de la cuenta
              </h3>
              {/* Ahora es un div simple, sin grid, porque solo hay un botón */}
              <div className="w-full">
                <button
                  type="button"
                  onClick={onChangePassword}
                  className={securityBtnClass}
                >
                  <LockIcon /> Cambiar Contraseña
                </button>
              </div>
            </div>

            {/* BOTONES PRINCIPALES */}
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-brand-primary hover:opacity-90 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center"
              >
                {isPending ? "Guardando cambios..." : "Guardar Cambios"}
              </button>

              <button
                type="button"
                onClick={onCancel}
                className="w-full bg-white text-brand-primary border-2 border-brand-primary hover:bg-blue-50 font-bold py-3 px-4 rounded-xl transition-all duration-200"
              >
                Cancelar y Volver al Perfil
              </button>

              <button
                type="button"
                onClick={onGoHome}
                className="w-full text-gray-400 hover:text-gray-600 font-medium text-sm py-2 transition-colors hover:underline"
              >
                Ir a la Página Principal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileDesign;
