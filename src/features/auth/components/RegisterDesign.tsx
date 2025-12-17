import React from "react";
import { Link } from "react-router-dom";
import { type FieldErrors, type UseFormRegister } from "react-hook-form";
import { type RegisterFields } from "../validators/authSchema";
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
    <div className="flex min-h-screen w-full items-center justify-center bg-[#C2C5AA] p-4">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl border border-[#A4AC86]">
        
        {/* Cabecera */}
        <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#333D29]">
            Crea tu cuenta
            </h2>
            <p className="mt-2 text-sm text-[#656D4A]">
            Únete a la comunidad de <span className="font-bold text-[#582F0E]">SOL-e</span>
            </p>
        </div>

        {serverError && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {serverError}
          </div>
        )}

        <form onSubmit={onSubmit}>
          
          {/* Fila Doble */}
          <div className="mb-4 flex flex-col gap-4 md:flex-row">
            <LabelInputContainer>
              <Label htmlFor="name" className="text-[#333D29]">Nombre</Label>
              <Input 
                id="name" placeholder="Tu nombre" type="text" {...register("name")} 
                className="bg-white border-[#A4AC86] text-[#333D29] focus-visible:ring-[#582F0E]" 
              />
              {errors.name && <span className="text-xs font-medium text-red-600">{errors.name.message}</span>}
            </LabelInputContainer>
            
            <LabelInputContainer>
              <Label htmlFor="lastName" className="text-[#333D29]">Apellido</Label>
              <Input 
                id="lastName" placeholder="Tus apellidos" type="text" {...register("lastName")} 
                className="bg-white border-[#A4AC86] text-[#333D29] focus-visible:ring-[#582F0E]" 
              />
              {errors.lastName && <span className="text-xs font-medium text-red-600">{errors.lastName.message}</span>}
            </LabelInputContainer>
          </div>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="username" className="text-[#333D29]">Usuario</Label>
            <Input 
                id="username" placeholder="Usuario" type="text" {...register("username")} 
                className="bg-white border-[#A4AC86] text-[#333D29] focus-visible:ring-[#582F0E]" 
            />
            {errors.username && <span className="text-xs font-medium text-red-600">{errors.username.message}</span>}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email" className="text-[#333D29]">Correo Electrónico</Label>
            <Input 
                id="email" placeholder="correo@ejemplo.com" type="email" {...register("email")} 
                className="bg-white border-[#A4AC86] text-[#333D29] focus-visible:ring-[#582F0E]" 
            />
            {errors.email && <span className="text-xs font-medium text-red-600">{errors.email.message}</span>}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="password" className="text-[#333D29]">Contraseña</Label>
            <Input 
                id="password" placeholder="Introduce una contraseña" type="password" {...register("password")} 
                className="bg-white border-[#A4AC86] text-[#333D29] focus-visible:ring-[#582F0E]" 
            />
            {errors.password && <span className="text-xs font-medium text-red-600">{errors.password.message}</span>}
          </LabelInputContainer>

          {/* INPUT DE ARCHIVO */}
          <LabelInputContainer className="mb-8">
            <Label className="text-[#333D29]">Foto de Perfil</Label>
            <div className="flex items-center gap-3 rounded-lg border border-[#A4AC86] bg-[#EBECE2] p-2">
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="h-auto w-full cursor-pointer border-none bg-transparent p-0 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-[#333D29] file:px-4 file:py-2 file:text-xs file:font-medium file:text-white file:transition-colors hover:file:bg-[#414833]"
              />
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-[#582F0E]"
                />
              ) : (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#A4AC86] text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
              )}
            </div>
          </LabelInputContainer>

          <button
            className="group/btn relative block h-11 w-full rounded-lg bg-[#582F0E] font-bold text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] transition-transform hover:scale-[1.02] hover:bg-[#7F4F24] disabled:opacity-70"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"/>
                    Registrando...
                </span>
            ) : (
                <>Registrarse &rarr;</>
            )}
            <BottomGradient />
          </button>
        </form>

        <div className="mt-8 border-t border-[#C2C5AA] pt-6 text-center">
            <p className="text-sm text-[#656D4A]">
              ¿Ya estás registrado?
            </p>
            <Link
                to="/login"
                className="mt-1 inline-block text-sm font-bold text-[#7F4F24] transition-colors hover:text-[#582F0E] hover:underline"
            >
                Inicia sesión aquí
            </Link>
        </div>

      </div>
    </div>
  );
};


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