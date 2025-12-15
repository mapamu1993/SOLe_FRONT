import React from "react";
import { Link } from "react-router-dom";
import { type FieldErrors, type UseFormRegister } from "react-hook-form";
import { type CreateProductFields } from "../validators/ProductSchema";
import { Label } from "../../../auth/components/ui/label";
import { Input } from "../../../auth/components/ui/input";
import { cn } from "@/lib/utils";

interface ProductFormDesignProps {
  // Datos del formulario
  register: UseFormRegister<CreateProductFields>; // TypeScript inferirá esto correctamente
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
    <div className="flex min-h-screen w-full items-center justify-center bg-[#C2C5AA] p-4">
      <div className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-8 shadow-2xl border border-[#A4AC86]">
        {/* Cabecera */}
        <div className="mb-6 flex items-center justify-between border-b border-[#C2C5AA] pb-4">
          <div>
            <h2 className="text-2xl font-bold text-[#333D29]">{pageTitle}</h2>
            <p className="mt-1 text-sm text-[#656D4A]">
              Añade un nuevo artículo a tu tienda
            </p>
          </div>
          <Link
            to="/tienda"
            className="text-sm font-medium text-[#7F4F24] hover:underline"
          >
            Cancelar y volver
          </Link>
        </div>

        {/* Mensaje de Error General */}
        {serverError && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            ⚠️ {serverError}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          {/* NOMBRE */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#333D29]">
              Nombre del Producto
            </Label>
            <Input
              id="name"
              placeholder="Ej: Kit de Supervivencia..."
              {...register("name")}
              className="bg-white border-[#A4AC86] text-[#333D29] focus-visible:ring-[#582F0E]"
            />
            {errors.name && (
              <span className="text-xs font-medium text-red-600">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* DESCRIPCIÓN */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-[#333D29]">
              Descripción
            </Label>
            <textarea
              id="description"
              rows={4}
              placeholder="Detalles del producto..."
              {...register("description")}
              className={cn(
                "flex w-full rounded-md border border-[#A4AC86] bg-white px-3 py-2 text-sm text-[#333D29] shadow-input transition duration-400",
                "placeholder:text-[#333D29]/50 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-[#582F0E]",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
            />
            {errors.description && (
              <span className="text-xs font-medium text-red-600">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* FILA DOBLE: PRECIO Y STOCK */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-[#333D29]">
                Precio (€)
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                // IMPORTANTE: Mantenemos la lógica de valueAsNumber aquí
                {...register("price", { valueAsNumber: true })}
                className="bg-white border-[#A4AC86] text-[#333D29] focus-visible:ring-[#582F0E]"
              />
              {errors.price && (
                <span className="text-xs font-medium text-red-600">
                  {errors.price.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock" className="text-[#333D29]">
                Stock
              </Label>
              <Input
                id="stock"
                type="number"
                // IMPORTANTE: Mantenemos la lógica de valueAsNumber aquí
                {...register("stock", { valueAsNumber: true })}
                className="bg-white border-[#A4AC86] text-[#333D29] focus-visible:ring-[#582F0E]"
              />
              {errors.stock && (
                <span className="text-xs font-medium text-red-600">
                  {errors.stock.message}
                </span>
              )}
            </div>
          </div>

          {/* CATEGORÍA */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-[#333D29]">
              Categoría
            </Label>
            <Input
              id="category"
              placeholder="Ej: Accesorios, Ropa..."
              {...register("category")}
              className="bg-white border-[#A4AC86] text-[#333D29] focus-visible:ring-[#582F0E]"
            />
            {errors.category && (
              <span className="text-xs font-medium text-red-600">
                {errors.category.message}
              </span>
            )}
          </div>

          {/* IMAGEN */}
          <div className="space-y-2">
            <Label className="text-[#333D29]">Imagen del Producto</Label>
            <div className="flex flex-col gap-4 rounded-lg border border-[#A4AC86] bg-[#EBECE2] p-4">
              {/* Visualizador */}
              <div className="relative h-48 w-full overflow-hidden rounded-md bg-[#A4AC86]/20">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[#656D4A]">
                    <span>Sin imagen seleccionada</span>
                  </div>
                )}
              </div>

              {/* Input */}
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
            {isSubmitting ? "Guardando..." : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};
