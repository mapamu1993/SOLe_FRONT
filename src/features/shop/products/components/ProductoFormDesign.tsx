import React from "react";
import { Link } from "react-router-dom";
import { type FieldErrors, type UseFormRegister } from "react-hook-form";
import { type CreateProductFields } from "../validators/ProductSchema";
import { Label } from "../../../auth/components/ui/label";
import { Input } from "../../../auth/components/ui/input";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  IconUpload,
  IconArrowLeft,
  IconDeviceFloppy,
  IconX,
  IconCurrencyEuro,
  IconPackage,
  IconCategory,
} from "@tabler/icons-react";

interface ProductFormDesignProps {
  // Datos del formulario
  register: UseFormRegister<CreateProductFields>;
  errors: FieldErrors<CreateProductFields>;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;

  // Textos y Estados
  pageTitle: string;
  buttonText: string;
  serverError?: string;

  // Manejo de Archivos
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentFile: File | null;
}

export const ProductFormDesign = ({
  register,
  errors,
  isSubmitting,
  onSubmit,
  pageTitle,
  buttonText,
  serverError,
  onFileChange,
  currentFile,
}: ProductFormDesignProps) => {
  // Calculamos la preview visual aquí
  const previewUrl = currentFile ? URL.createObjectURL(currentFile) : null;

  return (
    // 1. FONDO BASE Y ESPACIADO (Igual que BlogFormDesign)
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
              <h2 className="text-3xl font-bold text-[#333D29] tracking-tight">
                {pageTitle}
              </h2>
              <p className="mt-2 text-sm text-[#656D4A] font-medium">
                Gestiona el inventario de tu tienda
              </p>
            </div>
            <Link to="/tienda">
              <button className="flex items-center gap-2 text-sm font-bold text-[#656D4A] hover:text-[#582F0E] transition-colors px-4 py-2 rounded-full hover:bg-[#EBECE2]">
                <IconArrowLeft size={18} /> Cancelar
              </button>
            </Link>
          </div>

          {/* MENSAJE DE ERROR */}
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
            {/* NOMBRE DEL PRODUCTO */}
            <div className="space-y-3">
              <Label
                htmlFor="name"
                className="text-[#333D29] font-bold uppercase tracking-wider text-xs ml-1"
              >
                Nombre del Producto
              </Label>
              <Input
                id="name"
                placeholder="Ej: Kit de Supervivencia..."
                {...register("name")}
                className="bg-[#F5F5F0] border-transparent focus:border-[#B6AD90] focus:ring-0 text-[#333D29] placeholder:text-[#333D29]/40 h-14 rounded-xl text-lg font-medium shadow-none"
              />
              {errors.name && (
                <span className="text-xs font-bold text-red-500 ml-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* DESCRIPCIÓN */}
            <div className="space-y-3">
              <Label
                htmlFor="description"
                className="text-[#333D29] font-bold uppercase tracking-wider text-xs ml-1"
              >
                Descripción
              </Label>
              <textarea
                id="description"
                rows={4}
                placeholder="Detalles técnicos, materiales, uso..."
                {...register("description")}
                className={cn(
                  "flex w-full rounded-2xl border-transparent bg-[#F5F5F0] px-4 py-4 text-base text-[#333D29] placeholder:text-[#333D29]/40 focus:border-[#B6AD90] focus:outline-none focus:ring-2 focus:ring-[#B6AD90]/20 transition-all resize-y shadow-none",
                  "disabled:cursor-not-allowed disabled:opacity-50"
                )}
              />
              {errors.description && (
                <span className="text-xs font-bold text-red-500 ml-1">
                  {errors.description.message}
                </span>
              )}
            </div>

            {/* FILA DOBLE: PRECIO Y STOCK */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <Label
                  htmlFor="price"
                  className="text-[#333D29] font-bold uppercase tracking-wider text-xs ml-1"
                >
                  Precio (€)
                </Label>
                <div className="relative">
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    {...register("price", { valueAsNumber: true })}
                    className="bg-[#F5F5F0] border-transparent focus:border-[#B6AD90] focus:ring-0 text-[#333D29] placeholder:text-[#333D29]/40 h-14 rounded-xl text-lg font-medium pl-10 shadow-none"
                  />
                  <IconCurrencyEuro
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B6AD90]"
                    size={20}
                  />
                </div>
                {errors.price && (
                  <span className="text-xs font-bold text-red-500 ml-1">
                    {errors.price.message}
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="stock"
                  className="text-[#333D29] font-bold uppercase tracking-wider text-xs ml-1"
                >
                  Stock Disponible
                </Label>
                <div className="relative">
                  <Input
                    id="stock"
                    type="number"
                    {...register("stock", { valueAsNumber: true })}
                    className="bg-[#F5F5F0] border-transparent focus:border-[#B6AD90] focus:ring-0 text-[#333D29] placeholder:text-[#333D29]/40 h-14 rounded-xl text-lg font-medium pl-10 shadow-none"
                  />
                  <IconPackage
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B6AD90]"
                    size={20}
                  />
                </div>
                {errors.stock && (
                  <span className="text-xs font-bold text-red-500 ml-1">
                    {errors.stock.message}
                  </span>
                )}
              </div>
            </div>

            {/* CATEGORÍA */}
            <div className="space-y-3">
              <Label
                htmlFor="category"
                className="text-[#333D29] font-bold uppercase tracking-wider text-xs ml-1"
              >
                Categoría
              </Label>
              <div className="relative">
                <Input
                  id="category"
                  placeholder="Ej: Accesorios, Ropa..."
                  {...register("category")}
                  className="bg-[#F5F5F0] border-transparent focus:border-[#B6AD90] focus:ring-0 text-[#333D29] placeholder:text-[#333D29]/40 h-14 rounded-xl text-lg font-medium pl-10 shadow-none"
                />
                <IconCategory
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B6AD90]"
                  size={20}
                />
              </div>
              {errors.category && (
                <span className="text-xs font-bold text-red-500 ml-1">
                  {errors.category.message}
                </span>
              )}
            </div>

            {/* IMAGEN DEL PRODUCTO (Diseño Drag & Drop) */}
            <div className="space-y-3">
              <Label className="text-[#333D29] font-bold uppercase tracking-wider text-xs ml-1">
                Imagen del Producto
              </Label>

              <div className="group relative w-full overflow-hidden rounded-2xl border-2 border-dashed border-[#B6AD90]/50 bg-[#F5F5F0] transition-colors hover:bg-[#EBECE2]">
                {/* Visualizador */}
                <div className="relative h-64 w-full flex flex-col items-center justify-center text-[#656D4A]">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="h-full w-full object-contain p-2"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 p-6 text-center">
                      <div className="p-4 rounded-full bg-white shadow-sm">
                        <IconUpload
                          size={32}
                          className="text-[#333D29]"
                          stroke={1.5}
                        />
                      </div>
                      <p className="font-bold text-sm">
                        Sube la foto del artículo
                      </p>
                      <p className="text-xs opacity-70">
                        JPG, PNG preferiblemente fondo transparente
                      </p>
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

            {/* BOTÓN SUBMIT (Estilo Swipe) */}
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
                      <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
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
