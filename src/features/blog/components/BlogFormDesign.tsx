import React from "react";
import { Link } from "react-router-dom";
import { type FieldErrors, type UseFormRegister } from "react-hook-form";
import { type CreateBlogFields } from "../validators/blogSchema";
import { Label } from "../../auth/components/ui/label";
import { Input } from "../../auth/components/ui/input";
import { cn } from "@/lib/utils";

interface BlogFormDesignProps {
  // Datos del formulario
  register: UseFormRegister<CreateBlogFields>;
  errors: FieldErrors<CreateBlogFields>;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  
  // Textos variables (porque se usa para Crear y Editar)
  pageTitle: string;
  buttonText: string;
  serverError?: string; // O localError
  
  // Manejo de Archivos
  // Recibimos la función setFile directamente o un handler
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  
  // Para previsualizar
  currentFile: File | null;
  existingImageUrl?: string | null; // Para cuando editamos
}

export const BlogFormDesign = ({
  register,
  errors,
  isSubmitting,
  onSubmit,
  pageTitle,
  buttonText,
  serverError,
  onFileChange,
  currentFile,
  existingImageUrl,
}: BlogFormDesignProps) => {

  // Calculamos la preview visual aquí para no tocar la lógica del padre
  const previewUrl = currentFile 
    ? URL.createObjectURL(currentFile) 
    : existingImageUrl;

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#C2C5AA] p-4">
      <div className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-8 shadow-2xl border border-[#A4AC86]">
        
        {/* Cabecera */}
        <div className="mb-6 flex items-center justify-between border-b border-[#C2C5AA] pb-4">
            <div>
                <h2 className="text-2xl font-bold text-[#333D29]">{pageTitle}</h2>
                <p className="mt-1 text-sm text-[#656D4A]">Gestiona el contenido de tu blog</p>
            </div>
            <Link to="/blog" className="text-sm font-medium text-[#7F4F24] hover:underline">
                Cancelar y volver
            </Link>
        </div>

        {/* Mensaje de Error */}
        {serverError && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            ⚠️ {serverError}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          
          {/* TÍTULO */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-[#333D29]">Título</Label>
            <Input 
              id="title" 
              placeholder="Ej: Los beneficios del sol..." 
              {...register("title")}
              className="bg-white border-[#A4AC86] text-[#333D29] focus-visible:ring-[#582F0E]" 
            />
            {errors.title && <span className="text-xs font-medium text-red-600">{errors.title.message}</span>}
          </div>

          {/* CONTENIDO (Textarea simulado con estilos de Input) */}
          <div className="space-y-2">
            <Label htmlFor="content" className="text-[#333D29]">Contenido</Label>
            <textarea
              id="content"
              rows={10}
              placeholder="Escribe aquí el cuerpo de tu artículo..."
              {...register("content")}
              className={cn(
                "flex w-full rounded-md border border-[#A4AC86] bg-white px-3 py-2 text-sm text-[#333D29] shadow-input transition duration-400",
                "placeholder:text-[#333D29]/50 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-[#582F0E]",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
            />
            {errors.content && <span className="text-xs font-medium text-red-600">{errors.content.message}</span>}
          </div>

          {/* IMAGEN DE PORTADA */}
          <div className="space-y-2">
            <Label className="text-[#333D29]">Imagen Destacada</Label>
            
            <div className="flex flex-col gap-4 rounded-lg border border-[#A4AC86] bg-[#EBECE2] p-4">
                {/* Visualizador de imagen */}
                <div className="relative h-48 w-full overflow-hidden rounded-md bg-[#A4AC86]/20">
                    {previewUrl ? (
                        <img 
                            src={previewUrl} 
                            alt="Preview" 
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-[#656D4A]">
                            <span>Sin imagen seleccionada</span>
                        </div>
                    )}
                </div>

                {/* Input de archivo */}
                <Input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    className="cursor-pointer file:mr-4 file:rounded-full file:border-0 file:bg-[#333D29] file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-[#414833]"
                />
            </div>
          </div>

          {/* BOTÓN SUBMIT */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-[#582F0E] py-3 font-bold text-white shadow-lg transition-transform hover:scale-[1.01] hover:bg-[#7F4F24] disabled:opacity-70"
          >
            {isSubmitting ? "Procesando..." : buttonText}
          </button>

        </form>
      </div>
    </div>
  );
};