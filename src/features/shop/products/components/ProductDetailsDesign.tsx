import { Link } from "react-router-dom";
import { type Product } from "../types/productTypes";
import { IMAGE_URL } from "../../../../config/constants";
import {
  ShoppingCart,
  ArrowLeft,
  Tag,
  Package,
  AlertCircle,
} from "lucide-react";

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
    <div className="min-h-screen w-full bg-[#C2C5AA] p-4 font-sans flex items-center justify-center">
      {/* TARJETA PRINCIPAL */}
      <div className="w-full max-w-5xl rounded-2xl bg-white shadow-2xl border border-[#A4AC86] overflow-hidden">
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
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
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
            <div className="w-full md:w-1/2 bg-[#EBECE2] flex items-center justify-center p-8 relative min-h-[400px]">
              {/* Botón Volver Flotante (Móvil y Desktop) */}
              <Link
                to="/tienda"
                className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-[#582F0E] font-bold text-sm shadow-sm hover:bg-white transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Volver
              </Link>

              {product.image ? (
                <img
                  src={getImageUrl(product.image)!}
                  alt={product.name}
                  className="max-h-[400px] w-full object-contain drop-shadow-lg transition-transform hover:scale-105 duration-500"
                />
              ) : (
                <div className="text-[#A4AC86] font-medium">
                  Sin imagen disponible
                </div>
              )}
            </div>

            {/* SECCIÓN INFORMACIÓN (Derecha) */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              {/* Categoría */}
              <div className="flex items-center gap-2 text-[#656D4A] mb-4 text-sm font-bold uppercase tracking-wider">
                <Tag className="w-4 h-4" />
                <span>{product.category || "General"}</span>
              </div>

              {/* Título */}
              <h1 className="text-3xl md:text-4xl font-bold text-[#333D29] mb-4 font-serif leading-tight">
                {product.name}
              </h1>

              {/* Precio */}
              <div className="text-3xl font-bold text-[#582F0E] mb-6">
                ${product.price.toFixed(2)}
              </div>

              {/* Descripción */}
              <p className="text-[#656D4A] leading-relaxed mb-8 text-lg">
                {product.description}
              </p>

              <hr className="border-[#A4AC86]/30 mb-8" />

              {/* Stock y Botón */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-[#333D29] font-medium">
                  <Package className="w-5 h-5 text-[#656D4A]" />
                  <span>Stock disponible: {product.stock} unidades</span>
                </div>

                <button
                  onClick={() => onAddToCart(product._id)}
                  disabled={isAddingToCart || product.stock === 0}
                  className="w-full flex items-center justify-center gap-3 bg-[#582F0E] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-[#7F4F24] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAddingToCart ? (
                    "Añadiendo..."
                  ) : product.stock === 0 ? (
                    "Agotado"
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" /> Añadir al Carrito
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
