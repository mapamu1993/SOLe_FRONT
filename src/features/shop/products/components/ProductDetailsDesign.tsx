import { Link } from "react-router-dom";
import { type Product } from "../types/productTypes";
import { IMAGE_URL } from "../../../../config/constants";
// 1. CAMBIO: Usamos Tabler Icons (ya instalado) en lugar de Lucide
import {
  IconShoppingCart,
  IconArrowLeft,
  IconTag,
  IconPackage,
  IconAlertCircle,
} from "@tabler/icons-react";

interface ProductDetailsDesignProps {
  product: Product | undefined;
  isLoading: boolean;
  isError: boolean;
  onAddToCart: (productId: string) => void;
  isAddingToCart: boolean;
}

export const ProductDetailsDesign = ({
  product,
  isLoading,
  isError,
  onAddToCart,
  isAddingToCart,
}: ProductDetailsDesignProps) => {
  
  // Función para resolver imagen
  const getImageUrl = (img: string) => {
    if (!img) return null;
    if (img.startsWith("http")) return img;
    return `${IMAGE_URL}/uploads/products/${img}`;
  };

  return (
    // FONDO GENERAL
    <div className="min-h-screen w-full bg-[#C2C5AA] p-4 font-sans flex items-center justify-center pt-24 md:pt-0">
      {/* TARJETA PRINCIPAL */}
      <div className="w-full max-w-5xl rounded-[2.5rem] bg-white shadow-2xl border border-[#A4AC86] overflow-hidden">
        
        {/* ESTADO: CARGANDO */}
        {isLoading && (
          <div className="flex h-96 flex-col items-center justify-center text-[#582F0E]">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#A4AC86] border-t-[#582F0E]" />
            <p className="mt-4 font-medium">Cargando producto...</p>
          </div>
        )}

        {/* ESTADO: ERROR */}
        {isError && (
          <div className="flex h-96 flex-col items-center justify-center p-8 text-center">
            <IconAlertCircle className="h-12 w-12 text-red-500 mb-4" stroke={1.5} />
            <h2 className="text-xl font-bold text-[#333D29]">
              Producto no encontrado
            </h2>
            <Link
              to="/tienda"
              className="mt-6 text-[#7F4F24] font-bold hover:underline"
            >
              Volver a la tienda
            </Link>
          </div>
        )}

        {/* CONTENIDO DEL PRODUCTO */}
        {!isLoading && !isError && product && (
          <div className="flex flex-col md:flex-row">
            {/* SECCIÓN IMAGEN (Izquierda) */}
            <div className="w-full md:w-1/2 bg-[#EBECE2] flex items-center justify-center p-8 relative min-h-[400px] md:min-h-[600px]">
              {/* Botón Volver Flotante */}
              <Link
                to="/tienda"
                className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-[#582F0E] font-bold text-sm shadow-sm hover:bg-white transition-all z-10"
              >
                <IconArrowLeft className="w-4 h-4" stroke={2} /> Volver
              </Link>

              {product.image ? (
                <img
                  src={getImageUrl(product.image)!}
                  alt={product.name}
                  className="max-h-[400px] w-full object-contain drop-shadow-2xl transition-transform hover:scale-105 duration-700"
                />
              ) : (
                <div className="text-[#A4AC86] font-medium">
                  Sin imagen disponible
                </div>
              )}
            </div>

            {/* SECCIÓN INFORMACIÓN (Derecha) */}
            <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white">
              {/* Categoría */}
              <div className="flex items-center gap-2 text-[#656D4A] mb-4 text-xs font-bold uppercase tracking-widest">
                <IconTag className="w-4 h-4" stroke={2} />
                <span>{product.category || "General"}</span>
              </div>

              {/* Título */}
              <h1 className="text-4xl md:text-5xl font-bold text-[#333D29] mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Precio */}
              <div className="text-3xl font-bold text-[#582F0E] mb-8">
                ${product.price.toFixed(2)}
              </div>

              {/* Descripción */}
              <p className="text-[#656D4A] leading-relaxed mb-10 text-lg font-light">
                {product.description}
              </p>

              <hr className="border-[#A4AC86]/20 mb-10" />

              {/* Stock y Botón */}
              <div className="space-y-8">
                <div className="flex items-center gap-2 text-[#333D29] font-medium text-sm bg-[#EBECE2]/50 p-3 rounded-lg w-fit">
                  <IconPackage className="w-5 h-5 text-[#656D4A]" stroke={1.5} />
                  <span>Stock disponible: <span className="font-bold">{product.stock}</span> unidades</span>
                </div>

                <button
                  onClick={() => onAddToCart(product._id)}
                  disabled={isAddingToCart || product.stock === 0}
                  className="group relative w-full h-16 bg-[#333D29] text-white font-bold text-sm uppercase tracking-widest rounded-xl overflow-hidden shadow-xl hover:shadow-[#B6AD90]/40 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  <span className="absolute inset-0 w-full h-full bg-[#B6AD90] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100 ease-out" />
                  
                  <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-[#333D29] transition-colors">
                    {isAddingToCart ? (
                      "Añadiendo..."
                    ) : product.stock === 0 ? (
                      "Agotado"
                    ) : (
                      <>
                        <IconShoppingCart className="w-5 h-5" stroke={2} /> Añadir al Carrito
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};