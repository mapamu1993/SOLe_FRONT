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
    <div className="flex min-h-screen w-full items-center justify-center bg-white p-4 dark:bg-black">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-input dark:bg-black border border-neutral-200 dark:border-neutral-800">
        
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Bienvenido de nuevo
        </h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 mb-6">
          Inicia sesión en SOL-e
        </p>

        {serverError && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800">
            {serverError}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input id="email" type="email" placeholder="hola@ejemplo.com" {...register("email")} />
            {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
            {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br from-black to-neutral-600 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Entrando..." : "Iniciar Sesión →"}
            <BottomGradient />
          </button>
        </form>

        {/* ENLACE DE REGISTRO */}
        <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              ¿No tienes cuenta?
            </p>
            <Link to="/register" className="text-blue-600 dark:text-blue-500 font-bold hover:underline mt-2 inline-block">
                Regístrate ahora
            </Link>
        </div>
      </div>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px block h-px w-1/2 mx-auto bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};