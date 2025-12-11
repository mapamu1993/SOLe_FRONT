import React from "react";
import { Link } from "react-router-dom";
import { type FieldErrors, type UseFormRegister } from "react-hook-form";
import { type RegisterFields } from "../../auth/validators/auth.schema";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface RegisterDesignProps {
  register: UseFormRegister<RegisterFields>;
  errors: FieldErrors<RegisterFields>;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  serverError: string;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  previewUrl: string | null;
}

export const RegisterDesign = ({
  register,
  errors,
  isSubmitting,
  onSubmit,
  serverError,
  handleFileChange,
  previewUrl,
}: RegisterDesignProps) => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white p-4 dark:bg-black">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-input dark:bg-black border border-neutral-200 dark:border-neutral-800">
        
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Crea tu cuenta en SOL-e
        </h2>
        <p className="mt-2 text-sm max-w-sm text-neutral-600 dark:text-neutral-300 mb-6">
          Rellena tus datos para empezar
        </p>

        {serverError && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800">
            {serverError}
          </div>
        )}

        <form onSubmit={onSubmit}>
          
          {/* Fila Doble: Nombre y Apellido */}
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
            <LabelInputContainer>
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" placeholder="Tu nombre" type="text" {...register("name")} />
              {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
            </LabelInputContainer>
            
            <LabelInputContainer>
              <Label htmlFor="lastName">Apellido</Label>
              <Input id="lastName" placeholder="Apellidos" type="text" {...register("lastName")} />
              {errors.lastName && <span className="text-xs text-red-500">{errors.lastName.message}</span>}
            </LabelInputContainer>
          </div>

          {/* Usuario */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="username">Usuario</Label>
            <Input id="username" placeholder="usuario123" type="text" {...register("username")} />
            {errors.username && <span className="text-xs text-red-500">{errors.username.message}</span>}
          </LabelInputContainer>

          {/* Email */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input id="email" placeholder="hola@ejemplo.com" type="email" {...register("email")} />
            {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
          </LabelInputContainer>

          {/* Password */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" placeholder="••••••••" type="password" {...register("password")} />
            {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
          </LabelInputContainer>

          {/* Input de Foto Personalizado */}
          <LabelInputContainer className="mb-8">
            <Label>Foto de Perfil</Label>
            <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-2 dark:bg-zinc-800 border border-neutral-200 dark:border-neutral-700">
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="h-auto border-none bg-transparent p-0 shadow-none file:mr-4 file:rounded-md file:border-0 file:bg-black file:px-4 file:py-2 file:text-xs file:font-medium file:text-white hover:file:bg-neutral-800 dark:file:bg-white dark:file:text-black cursor-pointer"
              />
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-neutral-200 dark:ring-neutral-600"
                />
              )}
            </div>
          </LabelInputContainer>

          {/* Botón */}
          <button
            className="bg-gradient-to-br from-black to-neutral-600 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creando cuenta..." : "Registrarse →"}
            <BottomGradient />
          </button>
        </form>

        {/* Link al Login */}
        <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              ¿Ya tienes cuenta?
            </p>
            <Link to="/login" className="text-blue-600 dark:text-blue-500 font-bold hover:underline mt-2 inline-block">
                Inicia sesión aquí
            </Link>
        </div>

      </div>
    </div>
  );
};

// Componentes auxiliares para el estilo
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