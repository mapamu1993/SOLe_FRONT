import React from "react";
import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { type ForgotPasswordFields } from "../validators/authSchema";
import { cn } from "@/lib/utils";

// --- ICONOS ---
const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-[#656D4A]"
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

const QuestionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12 text-[#582F0E]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

interface ForgotPasswordDesignProps {
  register: UseFormRegister<ForgotPasswordFields>;
  errors: FieldErrors<ForgotPasswordFields>;
  isPending: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const ForgotPasswordDesign: React.FC<ForgotPasswordDesignProps> = ({
  register,
  errors,
  isPending,
  onSubmit,
}) => {
  const inputClass =
    "w-full pl-10 pr-4 py-2 border border-[#A4AC86] rounded-lg focus:ring-2 focus:ring-[#582F0E] focus:border-transparent outline-none transition-all bg-white text-[#333D29] placeholder:text-gray-400";
  const labelClass = "block text-sm font-medium text-[#333D29] mb-1";
  const errorClass = "text-red-600 text-xs mt-1 font-medium";
  const iconContainerClass = "absolute left-3 top-9";

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#C2C5AA] p-4 font-sans">
      {/* TARJETA */}
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl border border-[#A4AC86]">
        {/* Cabecera */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="mb-4 p-3 bg-[#C2C5AA]/30 rounded-full">
            <QuestionIcon />
          </div>
          <h2 className="text-2xl font-bold text-[#333D29] text-center">
            Recuperar Contraseña
          </h2>
        </div>

        <div>
          <p className="text-[#656D4A] text-sm text-center mb-8 leading-relaxed px-4">
            Ingresa el correo electrónico asociado a tu cuenta y te enviaremos
            un enlace para restablecer tu clave.
          </p>

          <form onSubmit={onSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <label className={labelClass}>Correo Electrónico</label>
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

            {/* Botón Enviar */}
            <button
              className="group/btn relative block h-11 w-full rounded-lg bg-[#582F0E] font-bold text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] transition-transform hover:scale-[1.02] hover:bg-[#7F4F24] disabled:opacity-70 mt-4"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Enviando...
                </span>
              ) : (
                "Enviar enlace de recuperación"
              )}
              <BottomGradient />
            </button>

            {/* Link Volver */}
            <div className="mt-8 border-t border-[#C2C5AA] pt-6 text-center">
              <span className="text-[#656D4A] text-sm">¿Ya te acordaste? </span>
              <RouterLink
                to="/login"
                className="ml-1 inline-block text-sm font-bold text-[#7F4F24] transition-colors hover:text-[#582F0E] hover:underline"
              >
                Volver a Iniciar Sesión
              </RouterLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Efectos Visuales (Los mismos del Login) ---
const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-[#B6AD90] to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px block h-px w-1/2 mx-auto bg-gradient-to-r from-transparent via-[#A68A64] to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

export default ForgotPasswordDesign;
