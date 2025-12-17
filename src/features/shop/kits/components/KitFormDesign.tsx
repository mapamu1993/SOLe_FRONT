import { useState, useEffect } from "react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { IconDeviceFloppy, IconUpload, IconX, IconPhoto, IconCheck } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Un toque suave de animación si está instalado, si no, funciona igual como div normal

interface KitFormDesignProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  pageTitle: string;
  buttonText: string;
  serverError?: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentFile?: File | null;
  currentImageUrl?: string;
}

export const KitFormDesign = ({
  register,
  errors,
  isSubmitting,
  onSubmit,
  pageTitle,
  buttonText,
  serverError,
  onFileChange,
  currentFile,
  currentImageUrl
}: KitFormDesignProps) => {

  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (currentFile) {
      const objectUrl = URL.createObjectURL(currentFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (currentImageUrl) {
      setPreview(currentImageUrl);
    } else {
      setPreview(null);
    }
  }, [currentFile, currentImageUrl]);

  // Clases comunes para inputs
  const inputClasses = "w-full bg-[#F5F5F0] border border-transparent focus:border-[#B6AD90] focus:bg-white focus:ring-0 rounded-xl px-4 py-3 text-[#333D29] placeholder:text-[#656D4A]/50 transition-all outline-none font-medium";
  const labelClasses = "block text-xs font-bold text-[#333D29] uppercase tracking-widest mb-2 ml-1";
  const errorClasses = "mt-1 text-xs font-bold text-red-500 ml-1";

  return (
    <div className="min-h-screen w-full bg-[#EBECE2] py-32 px-4 font-sans">
      <div className="mx-auto w-full max-w-3xl bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-[#333D29]/5">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-10 border-b border-[#F5F5F0] pb-6">
          <div>
            <span className="text-[#582F0E] font-bold tracking-widest text-xs uppercase mb-1 block">
                Panel de Administración
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-[#333D29] font-serif">
                {pageTitle}
            </h1>
          </div>
          <Link to="/kits">
             <button className="group p-3 rounded-full bg-[#F5F5F0] hover:bg-[#333D29] text-[#333D29] hover:text-white transition-colors">
                <IconX size={24} stroke={1.5} />
             </button>
          </Link>
        </div>

        {serverError && (
          <div className="mb-8 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 font-bold text-sm flex items-center gap-2">
            <IconX size={18} /> {serverError}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-8">
          
          {/* NOMBRE Y PRECIO (GRID) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Nombre del Kit</label>
              <input
                {...register("name", { required: "El nombre es obligatorio" })}
                className={inputClasses}
                placeholder="Ej: Kit Peregrino Básico"
              />
              {errors.name && <p className={errorClasses}>{String(errors.name.message)}</p>}
            </div>

            <div>
                <label className={labelClasses}>Precio (€)</label>
                <input
                  type="number"
                  step="0.01"
                  {...register("price", { required: "El precio es obligatorio", valueAsNumber: true })}
                  className={inputClasses}
                  placeholder="0.00"
                />
                {errors.price && <p className={errorClasses}>{String(errors.price.message)}</p>}
            </div>
          </div>

          {/* DESCRIPCIÓN */}
          <div>
            <label className={labelClasses}>Descripción</label>
            <textarea
              {...register("description", { required: "La descripción es obligatoria" })}
              rows={4}
              className={`${inputClasses} resize-none`}
              placeholder="Detalles sobre qué incluye este kit y para quién es ideal..."
            />
            {errors.description && <p className={errorClasses}>{String(errors.description.message)}</p>}
          </div>

          {/* CARACTERÍSTICAS */}
          <div>
             <label className={labelClasses}>Características (separadas por comas)</label>
             <input
               {...register("featuresString")}
               className={inputClasses}
               placeholder="Mochila impermeable, Bastones carbono, Guía oficial..."
             />
             <p className="text-[10px] text-[#656D4A] mt-2 ml-1 italic">
                Ejemplo: Bastones, Mochila 40L, Funda lluvia
             </p>
          </div>

          {/* CHECKBOX RECOMENDADO */}
          <div className="flex items-center gap-3 p-4 bg-[#F5F5F0] rounded-xl border border-transparent hover:border-[#B6AD90] transition-colors cursor-pointer">
            <div className="relative flex items-center">
                <input 
                    type="checkbox" 
                    {...register("isRecommended")} 
                    id="isRecommended"
                    className="peer w-5 h-5 cursor-pointer appearance-none rounded border border-[#656D4A] checked:bg-[#582F0E] checked:border-[#582F0E] transition-all" 
                />
                <IconCheck size={14} className="absolute left-0.5 top-0.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100" stroke={3} />
            </div>
            <label htmlFor="isRecommended" className="text-sm font-bold text-[#333D29] cursor-pointer select-none">
                Destacar como <span className="text-[#582F0E]">Kit Recomendado / VIP</span>
            </label>
          </div>

          {/* IMAGEN */}
          <div>
            <label className={labelClasses}>Imagen del Kit</label>
            
            <div className={`relative group border-2 border-dashed rounded-2xl p-8 text-center transition-all ${preview ? 'border-[#582F0E] bg-white' : 'border-[#A4AC86] bg-[#F5F5F0] hover:bg-[#EBECE2]'}`}>
              
              {/* VISTA PREVIA */}
              {preview && (
                <div className="mb-6 relative h-64 w-full rounded-xl overflow-hidden shadow-lg mx-auto">
                    <img src={preview} alt="Vista previa" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                </div>
              )}

              {/* INPUT FILE */}
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />

              {/* PLACEHOLDER */}
              <div className="flex flex-col items-center justify-center gap-3 text-[#656D4A]">
                <div className={`p-4 rounded-full ${preview ? 'bg-white text-[#582F0E]' : 'bg-[#EBECE2] text-[#656D4A]'} transition-colors`}>
                    {preview ? <IconPhoto size={32} /> : <IconUpload size={32} />}
                </div>
                <div className="space-y-1">
                    <p className="font-bold text-sm text-[#333D29]">
                        {preview ? "Click para cambiar la imagen" : "Sube una imagen"}
                    </p>
                    <p className="text-xs">PNG, JPG, WEBP hasta 5MB</p>
                </div>
              </div>
            </div>
          </div>

          {/* BOTÓN SUBMIT */}
          <div className="pt-4 border-t border-[#F5F5F0]">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-full bg-[#582F0E] text-white font-bold tracking-widest uppercase text-xs hover:bg-[#7F4F24] transition-all hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Guardando...</span>
                  </>
                ) : (
                  <>
                    <span>{buttonText}</span> <IconDeviceFloppy size={18} />
                  </>
                )}
              </button>
          </div>

        </form>
      </div>
    </div>
  );
};