import React from "react";
import { Link } from "react-router-dom";
import { type FieldErrors, type UseFormRegister } from "react-hook-form";
import { type CreateBlogFields } from "../validators/blogSchema";
import { Label } from "../../auth/components/ui/label";
import { Input } from "../../auth/components/ui/input";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { IconUpload, IconArrowLeft, IconDeviceFloppy, IconX } from "@tabler/icons-react";

interface BlogFormDesignProps {
  register: UseFormRegister<CreateBlogFields>;
  errors: FieldErrors<CreateBlogFields>;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  pageTitle: string;
  buttonText: string;
  serverError?: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentFile: File | null;
  existingImageUrl?: string | null;
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

  const previewUrl = currentFile 
    ? URL.createObjectURL(currentFile) 
    : existingImageUrl;

  return (
    // CAMBIO CLAVE AQUÍ:
    // 1. items-center: Centra verticalmente.
    // 2. py-32 md:py-40: Da aire arriba y abajo para no tocar Footer ni Navbar.
    <div className="flex min-h-screen w-full items-center justify-center bg-[#EBECE2] p-4 py-32 md:py-40 font-sans">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        {/* TARJETA DEL FORMULARIO */}
        <div className="rounded-[2.5rem] bg-white p-8 md:p-12 shadow-2xl border border-[#333D29]/5 relative overflow-hidden">
          
          {/* Decoración de fondo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#B6AD90] opacity-10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />

          {/* CABECERA */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EBECE2] pb-6 relative z-10">
            <div>
                <h2 className="text-3xl font-bold text-[#333D29] tracking-tight">{pageTitle}</h2>
                <p className="mt-2 text-sm text-[#656D4A] font-medium">Comparte tus experiencias con la comunidad</p>
            </div>
            <Link to="/blog">
                <button className="flex items-center gap-2 text-sm font-bold text-[#656D4A] hover:text-[#582F0E] transition-colors px-4 py-2 rounded-full hover:bg-[#EBECE2]">
                    <IconArrowLeft size={18} /> Cancelar
                </button>
            </Link>
          </div>

          {/* ERROR DEL SERVIDOR */}
          {serverError && (
            <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-6 flex items-center gap-3 rounded-2xl bg-red-50 p-4 text-red-600 border border-red-100"
            >
              <IconX size={20} />
              <span className="text-sm font-bold">{serverError}</span>
            </motion.div>
          )}

          <form onSubmit={onSubmit} className="space-y-8 relative z-10">
            
            {/* TÍTULO */}
            <div className="space-y-3">
              <Label htmlFor="title" className="text-[#333D29] font-bold uppercase tracking-wider text-xs ml-1">Título de la entrada</Label>
              <Input 
                id="title" 
                placeholder="Ej: Amanecer en O Cebreiro..." 
                {...register("title")}
                className="bg-[#F5F5F0] border-transparent focus:border-[#B6AD90] focus:ring-0 text-[#333D29] placeholder:text-[#333D29]/40 h-14 rounded-xl text-lg font-medium" 
              />
              {errors.title && <span className="text-xs font-bold text-red-500 ml-1">{errors.title.message}</span>}
            </div>

            {/* CONTENIDO */}
            <div className="space-y-3">
              <Label htmlFor="content" className="text-[#333D29] font-bold uppercase tracking-wider text-xs ml-1">Tu Historia</Label>
              <textarea
                id="content"
                rows={12}
                placeholder="Empieza a escribir aquí..."
                {...register("content")}
                className={cn(
                  "flex w-full rounded-2xl border-transparent bg-[#F5F5F0] px-4 py-4 text-base text-[#333D29] placeholder:text-[#333D29]/40 focus:border-[#B6AD90] focus:outline-none focus:ring-2 focus:ring-[#B6AD90]/20 transition-all resize-y",
                  "disabled:cursor-not-allowed disabled:opacity-50"
                )}
              />
              {errors.content && <span className="text-xs font-bold text-red-500 ml-1">{errors.content.message}</span>}
            </div>

            {/* IMAGEN DESTACADA */}
            <div className="space-y-3">
              <Label className="text-[#333D29] font-bold uppercase tracking-wider text-xs ml-1">Imagen de Portada</Label>
              
              <div className="group relative w-full overflow-hidden rounded-2xl border-2 border-dashed border-[#B6AD90]/50 bg-[#F5F5F0] transition-colors hover:bg-[#EBECE2]">
                  
                  {/* Visualizador */}
                  <div className="relative h-64 w-full flex flex-col items-center justify-center text-[#656D4A]">
                      {previewUrl ? (
                          <img 
                              src={previewUrl} 
                              alt="Preview" 
                              className="h-full w-full object-cover"
                          />
                      ) : (
                          <div className="flex flex-col items-center gap-2 p-6 text-center">
                              <div className="p-4 rounded-full bg-white shadow-sm">
                                <IconUpload size={32} className="text-[#333D29]" stroke={1.5} />
                              </div>
                              <p className="font-bold text-sm">Sube una foto inspiradora</p>
                              <p className="text-xs opacity-70">JPG, PNG hasta 5MB</p>
                          </div>
                      )}
                  </div>

                  {/* Input Invisible */}
                  <Input
                      type="file"
                      accept="image/*"
                      onChange={onFileChange}
                      className="absolute inset-0 cursor-pointer opacity-0 h-full w-full z-20"
                  />
              </div>
            </div>

            {/* BOTÓN SUBMIT */}
            <div className="pt-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full h-14 bg-[#333D29] text-white font-bold text-sm uppercase tracking-widest rounded-xl overflow-hidden shadow-xl hover:shadow-[#B6AD90]/40 transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100"
                >
                    <span className="absolute inset-0 w-full h-full bg-[#B6AD90] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100 ease-out" />
                    
                    <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-[#333D29] transition-colors">
                    {isSubmitting ? (
                        <>
                            <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"/>
                            Guardando...
                        </>
                    ) : (
                        <>
                            {buttonText} <IconDeviceFloppy size={18} />
                        </>
                    )}
                    </span>
                </button>
            </div>

          </form>
        </div>
      </motion.div>
    </div>
  );
};