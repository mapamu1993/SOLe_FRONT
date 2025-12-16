import { useState, useEffect } from "react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { IconDeviceFloppy, IconUpload, IconX, IconPhoto } from "@tabler/icons-react";
import { Link } from "react-router-dom";

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

  return (
    <div className="min-h-screen w-full bg-[#EBECE2] py-32 px-4">
      <div className="mx-auto w-full max-w-2xl bg-[#fdfcf5] rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-[#A4AC86]">
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#333D29] font-serif">{pageTitle}</h1>
          <Link to="/kits">
             <button className="p-2 rounded-full hover:bg-gray-100 text-[#656D4A]">
                <IconX size={24} />
             </button>
          </Link>
        </div>

        {serverError && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 font-medium text-sm">
            {serverError}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          
          <div>
            <label className="block text-sm font-bold text-[#333D29] mb-2">Nombre del Kit</label>
            <input
              {...register("name", { required: "El nombre es obligatorio" })}
              className="w-full px-4 py-3 rounded-xl border border-[#A4AC86] bg-white focus:ring-2 focus:ring-[#582F0E] outline-none"
              placeholder="Ej: Kit Peregrino Básico"
            />
            {errors.name && <p className="mt-1 text-xs text-red-500 font-bold">{String(errors.name.message)}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-[#333D29] mb-2">Descripción</label>
            <textarea
              {...register("description", { required: "La descripción es obligatoria" })}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-[#A4AC86] bg-white focus:ring-2 focus:ring-[#582F0E] outline-none resize-none"
              placeholder="Detalles sobre qué incluye este kit..."
            />
            {errors.description && <p className="mt-1 text-xs text-red-500 font-bold">{String(errors.description.message)}</p>}
          </div>

          {/* Solo Precio, sin nivel */}
          <div>
              <label className="block text-sm font-bold text-[#333D29] mb-2">Precio (€)</label>
              <input
                type="number"
                step="0.01"
                {...register("price", { required: "El precio es obligatorio", valueAsNumber: true })}
                className="w-full px-4 py-3 rounded-xl border border-[#A4AC86] bg-white focus:ring-2 focus:ring-[#582F0E] outline-none"
              />
              {errors.price && <p className="mt-1 text-xs text-red-500 font-bold">{String(errors.price.message)}</p>}
          </div>

          <div>
             <label className="block text-sm font-bold text-[#333D29] mb-2">Características (separadas por comas)</label>
             <input
               {...register("featuresString")}
               className="w-full px-4 py-3 rounded-xl border border-[#A4AC86] bg-white focus:ring-2 focus:ring-[#582F0E] outline-none"
               placeholder="Mochila, Bastones, Guía..."
             />
          </div>

          <div className="flex items-center gap-2">
            <input 
                type="checkbox" 
                {...register("isRecommended")} 
                id="isRecommended"
                className="w-5 h-5 accent-[#582F0E]" 
            />
            <label htmlFor="isRecommended" className="text-sm font-bold text-[#333D29]">¿Destacar como Recomendado / VIP?</label>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#333D29] mb-2">Imagen del Kit</label>
            
            {preview && (
                <div className="mb-4 relative h-48 w-full rounded-xl overflow-hidden border border-[#A4AC86] shadow-sm">
                    <img src={preview} alt="Vista previa" className="h-full w-full object-cover" />
                    <div className="absolute top-2 right-2 bg-white/80 backdrop-blur px-2 py-1 rounded text-xs font-bold text-[#333D29]">
                        Vista Previa
                    </div>
                </div>
            )}

            <div className="relative border-2 border-dashed border-[#A4AC86] rounded-xl p-6 text-center hover:bg-[#EBECE2]/50 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center gap-2 text-[#656D4A]">
                {preview ? <IconPhoto size={32} /> : <IconUpload size={32} />}
                <span className="font-medium text-sm">
                  {currentFile ? "Cambiar imagen seleccionada" : "Haz click o arrastra una imagen"}
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#582F0E] text-white font-bold tracking-widest uppercase hover:bg-[#7F4F24] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-lg"
          >
            {isSubmitting ? (
              <span className="animate-pulse">Guardando...</span>
            ) : (
              <>
                <IconDeviceFloppy size={20} />
                {buttonText}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};