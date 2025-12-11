import React from "react";
import { Link } from "react-router-dom";
import { type FieldErrors, type UseFormRegister } from "react-hook-form";
import { type LoginFormFields } from "../../auth/validators/auth.schema";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface LoginDesignProps {
  register: UseFormRegister<LoginFormFields>;
  errors: FieldErrors<LoginFormFields>;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  serverError: string;
}

export const LoginDesign = ({
  register,
  errors,
  isSubmitting,
  onSubmit,
  serverError,
}: LoginDesignProps) => {
  return (
    // FONDO: #C2C5AA (Tu verde salvia claro)
    <div className="flex min-h-screen w-full items-center justify-center bg-[#C2C5AA] p-4">
      
      {/* TARJETA */}
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl border border-[#A4AC86]">
        
        {/* Cabecera */}
        <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#333D29]">
            Bienvenido de nuevo
            </h2>
            <p className="mt-2 text-sm text-[#656D4A]">
            Ingresa a tu cuenta para continuar en <span className="font-bold text-[#582F0E]">SOL-e</span>
            </p>
        </div>

        {/* Mensaje de Error */}
        {serverError && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            ⚠️ {serverError}
          </div>
        )}

        <form onSubmit={onSubmit}>
          
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email" className="text-[#333D29]">Correo Electrónico</Label>
            
            {/* --- CORRECCIÓN AQUÍ --- */}
            {/* He quitado el className manual. Ahora usa los colores de tu input.tsx automáticamente */}
            <Input
              id="email"
              placeholder="tu@email.com"
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-xs font-medium text-red-600">{errors.email.message}</span>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="password" className="text-[#333D29]">Contraseña</Label>
            
            {/* --- CORRECCIÓN AQUÍ --- */}
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-xs font-medium text-red-600">{errors.password.message}</span>
            )}
          </LabelInputContainer>

          {/* BOTÓN (Marrón Cálido) */}
          <button
            className="group/btn relative block h-11 w-full rounded-lg bg-[#582F0E] font-bold text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] transition-transform hover:scale-[1.02] hover:bg-[#7F4F24] disabled:opacity-70"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"/>
                    Entrando...
                </span>
            ) : (
                <>Iniciar Sesión &rarr;</>
            )}
            <BottomGradient />
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 border-t border-[#C2C5AA] pt-6 text-center">
            <p className="text-sm text-[#656D4A]">
              ¿Aún no tienes cuenta?
            </p>
            <Link
                to="/register"
                className="mt-1 inline-block text-sm font-bold text-[#7F4F24] transition-colors hover:text-[#582F0E] hover:underline"
            >
                Regístrate aquí
            </Link>
        </div>

      </div>
    </div>
  );
};

// --- Efectos Visuales ---
const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-[#B6AD90] to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px block h-px w-1/2 mx-auto bg-gradient-to-r from-transparent via-[#A68A64] to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};