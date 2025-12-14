import { Link } from "react-router-dom";
import { type Product } from "../types/productTypes";
import { IMAGE_URL } from "../../../../config/constants";

interface ProductsListDesignProps {
  products: Product[] | undefined;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  isAdmin: boolean;
  onAddToCart: (productId: string) => void;
  isAddingToCart: boolean;
}

export const ProductsListDesign = ({
  products,
  isLoading,
  isError,
  errorMessage,
  isAdmin,
  onAddToCart,
  isAddingToCart,
}: ProductsListDesignProps) => {
  return (
    // FONDO GENERAL (Beige verdoso)
    <div className="min-h-screen w-full bg-[#C2C5AA] p-4 font-sans">
      
      {/* CONTENEDOR PRINCIPAL */}
      <div className="mx-auto w-full max-w-7xl rounded-2xl bg-white p-6 shadow-2xl border border-[#A4AC86] sm:p-8">
        
        {/* CABECERA: Título y Botón Crear */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#C2C5AA] pb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#333D29]">Tienda</h1>
            <p className="mt-2 text-[#656D4A]">
              Explora nuestros productos seleccionados para ti
            </p>
          </div>

          {isAdmin && (
            <Link to="/products/new">
              <button className="rounded-lg bg-[#582F0E] px-6 py-3 text-sm font-bold text-white shadow-md transition-transform hover:scale-105 hover:bg-[#7F4F24]">
                + Crear Producto
              </button>
            </Link>
          )}
        </div>

        {/* ESTADO: CARGANDO */}
        {isLoading && (
          <div className="flex h-64 flex-col items-center justify-center text-[#582F0E]">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#A4AC86] border-t-[#582F0E]" />
            <p className="mt-4 font-medium">Cargando productos...</p>
          </div>
        )}

        {/* ESTADO: ERROR */}
        {isError && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-700">
            <p className="font-bold text-lg">⚠️ ¡Ups! Algo salió mal</p>
            <p>{errorMessage}</p>
          </div>
        )}

        {/* LISTA DE PRODUCTOS (GRID) */}
        {!isLoading && !isError && products && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.length === 0 ? (
              <div className="col-span-full py-12 text-center text-[#656D4A]">
                <p>No hay productos disponibles en este momento.</p>
              </div>
            ) : (
              products.map((product) => (
                // TARJETA DE PRODUCTO
                <div
                  key={product._id}
                  className="flex flex-col overflow-hidden rounded-xl border border-[#A4AC86] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                >
                  {/* Imagen */}
                  <div className="relative h-48 w-full overflow-hidden bg-[#EBECE2]">
                    {product.image ? (
                      <img
                        src={`${IMAGE_URL}/uploads/products/${product.image}`}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[#A4AC86]">
                        <span className="text-sm">Sin imagen</span>
                      </div>
                    )}
                  </div>

                  {/* Contenido Tarjeta */}
                  <div className="flex flex-1 flex-col p-4">
                    <div className="mb-2 flex-1">
                      <h3 className="text-lg font-bold text-[#333D29] line-clamp-1" title={product.name}>
                        {product.name}
                      </h3>
                      {/* Si quisieras mostrar la categoría: 
                          <span className="text-xs font-semibold text-[#A4AC86] uppercase tracking-wider">{product.category}</span> 
                      */}
                    </div>

                    <div className="mt-4 flex items-end justify-between border-t border-[#EBECE2] pt-4">
                      <p className="text-xl font-bold text-[#582F0E]">
                        ${product.price.toFixed(2)}
                      </p>
                      <Link
                        to={`/products/${product._id}`}
                        className="text-sm font-medium text-[#7F4F24] hover:underline"
                      >
                        Ver detalle
                      </Link>
                    </div>

                    {/* Botón Añadir */}
                    <button
                      onClick={() => onAddToCart(product._id)}
                      disabled={isAddingToCart}
                      className="mt-4 w-full rounded-lg bg-[#582F0E] py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#7F4F24] disabled:cursor-not-allowed disabled:opacity-70 active:scale-95"
                    >
                      {isAddingToCart ? "Añadiendo..." : "Añadir al Carrito"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};