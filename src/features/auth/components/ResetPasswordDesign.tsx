import React from "react";
import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import { type ResetPasswordFields } from "../validators/authSchema";

// --- ICONOS (Para que quede Pro) ---
const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
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

const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const KeyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11.536 9.464l-.964-.964V6l-3-3H12a6 6 0 013 3zM7 14a1 1 0 11-2 0 1 1 0 012 0zM7 15a1 1 0 10-2 0 1 1 0 002 0z"
    />
  </svg>
);

interface ResetPasswordDesignProps {
  register: UseFormRegister<ResetPasswordFields>;
  errors: FieldErrors<ResetPasswordFields>;
  isPending: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const ResetPasswordDesign: React.FC<ResetPasswordDesignProps> = ({
  register,
  errors,
  isPending,
  onSubmit,
  onCancel,
}) => {
  // Clases de estilo (Mismo look que el perfil)
  const inputClass =
    "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-gray-800";
  const labelClass =
    "block text-xs font-bold text-gray-700 uppercase mb-1 tracking-wide";
  const errorClass = "text-red-500 text-xs mt-1 font-medium";
  const iconContainerClass = "absolute left-3 top-9"; // Posición del icono dentro del input

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4 font-sans">
      <div className="bg-brand-card shadow-2xl rounded-2xl overflow-hidden max-w-md w-full border border-gray-200 flex flex-col">
        {/* Banner Superior */}
        <div className="h-24 bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-center relative">
          <button
            type="button"
            onClick={onCancel}
            className="absolute top-4 left-4 text-white/80 hover:text-white font-semibold text-sm flex items-center gap-1 transition-colors bg-black/10 px-3 py-1 rounded-full hover:bg-black/20"
          >
            ← Volver
          </button>
          <h2 className="text-white text-xl font-bold drop-shadow-md">
            Seguridad
          </h2>
        </div>

        <div className="p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Cambiar Contraseña
            </h1>
            <p className="text-white text-sm">
              Introduce el código PIN que te enviamos al correo y establece tu
              nueva clave.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            {/* Email (Solo lectura o editable según prefieras) */}
            <div className="relative">
              <label className={labelClass}>Email</label>
              <input
                type="email"
                {...register("email")}
                className={inputClass}
                placeholder="tu@email.com"
              />
              <div className={iconContainerClass}>
                <EmailIcon />
              </div>
              {errors.email && (
                <p className={errorClass}>{errors.email.message}</p>
              )}
            </div>

            {/* PIN */}
            <div className="relative">
              <label className={labelClass}>Código PIN</label>
              <input
                type="text"
                {...register("pin")}
                className={inputClass}
                placeholder="Introduce el código"
              />
              <div className={iconContainerClass}>
                <KeyIcon />
              </div>
              {errors.pin && <p className={errorClass}>{errors.pin.message}</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <label className={labelClass}>Nueva Contraseña</label>
              <input
                type="password"
                {...register("password")}
                className={inputClass}
                placeholder="••••••••"
              />
              <div className={iconContainerClass}>
                <LockIcon />
              </div>
              {errors.password && (
                <p className={errorClass}>{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className={labelClass}>Confirmar Contraseña</label>
              <input
                type="password"
                {...register("confirmPassword")}
                className={inputClass}
                placeholder="••••••••"
              />
              <div className={iconContainerClass}>
                <LockIcon />
              </div>
              {errors.confirmPassword && (
                <p className={errorClass}>{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* --- BOTONES DE ACCIÓN --- */}
            <div className="flex flex-col gap-3 pt-4 mt-6 border-t border-gray-100">
              {/* Botón Guardar */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-brand-primary hover:opacity-90 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Actualizando..." : "Guardar Nueva Contraseña"}
              </button>

              {/* Botón Cancelar (Vuelve a editar perfil) */}
              <button
                type="button"
                onClick={onCancel}
                className="w-full bg-white text-brand-primary border-2 border-brand-primary hover:bg-blue-50 font-bold py-3 px-4 rounded-xl transition-all duration-200"
              >
                Salir sin guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordDesign;
