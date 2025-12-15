import { Link } from "react-router-dom";
import { type CartItem } from "../types/cartTypes";
import { IMAGE_URL } from "../../../../config/constants";
import { cn } from "@/lib/utils";
import { getImageUrl } from "../../../../utils/imageUtil";

interface CartListDesignProps {
  items: CartItem[];
  isLoading: boolean;
  isError: boolean;
  subtotal: number;
  onUpdateQuantity: (productId: string, change: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const CartListDesign = ({
  items,
  isLoading,
  isError,
  subtotal,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartListDesignProps) => {
  return (
    // FONDO GENERAL (Beige verdoso)
    <div className="min-h-screen w-full bg-[#C2C5AA] p-4 font-sans">
      {/* CONTENEDOR PRINCIPAL */}
      <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white p-6 shadow-2xl border border-[#A4AC86] sm:p-8">
        {/* CABECERA */}
        <div className="mb-8 flex items-center justify-between border-b border-[#C2C5AA] pb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#333D29]">Mi Carrito</h1>
            <p className="mt-2 text-[#656D4A]">
              Revisa tus productos antes de finalizar la compra
            </p>
          </div>
          <Link
            to="/tienda"
            className="text-sm font-medium text-[#7F4F24] hover:underline"
          >
            Seguir comprando
          </Link>
        </div>

        {/* ESTADO: CARGANDO */}
        {isLoading && (
          <div className="flex h-64 flex-col items-center justify-center text-[#582F0E]">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#A4AC86] border-t-[#582F0E]" />
            <p className="mt-4 font-medium">Cargando carrito...</p>
          </div>
        )}

        {/* ESTADO: ERROR */}
        {isError && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-700">
            <p className="font-bold text-lg">⚠️ No se pudo cargar el carrito</p>
            <p>Inténtalo de nuevo más tarde.</p>
          </div>
        )}

        {/* CONTENIDO DEL CARRITO */}
        {!isLoading && !isError && (
          <>
            {items.length === 0 ? (
              // CARRITO VACÍO
              <div className="rounded-xl border border-dashed border-[#A4AC86] bg-[#EBECE2]/50 py-16 text-center">
                <p className="text-lg font-medium text-[#333D29]">
                  Tu carrito está vacío 🍃
                </p>
                <Link
                  to="/tienda"
                  className="mt-4 inline-block rounded-lg bg-[#582F0E] px-6 py-2 text-white transition hover:bg-[#7F4F24]"
                >
                  Ir a la tienda
                </Link>
              </div>
            ) : (
              // LISTA DE ITEMS
              <div className="space-y-8">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-col gap-4 rounded-xl border border-[#A4AC86] bg-white p-4 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                    >
                      {/* Imagen y Nombre */}
                      <div className="flex items-center gap-4 sm:flex-1">
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border border-[#C2C5AA] bg-[#EBECE2]">
                          {item.product.image ? (
                            <img
                              src={getImageUrl(
                                `uploads/products/${item.product.image}`
                              )}
                              alt={item.product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-[#A4AC86]">
                              Sin foto
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-[#333D29]">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-[#656D4A]">
                            Precio unidad: ${item.product.price}
                          </p>
                        </div>
                      </div>

                      {/* Controles de Cantidad */}
                      <div className="flex items-center justify-between gap-6 sm:justify-end">
                        <div className="flex items-center rounded-lg border border-[#A4AC86] bg-[#F5F5F0]">
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.product._id, -1)
                            }
                            className="px-3 py-1 text-lg font-bold text-[#582F0E] hover:bg-[#EBECE2] hover:text-[#7F4F24]"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-medium text-[#333D29]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.product._id, 1)
                            }
                            className="px-3 py-1 text-lg font-bold text-[#582F0E] hover:bg-[#EBECE2] hover:text-[#7F4F24]"
                          >
                            +
                          </button>
                        </div>

                        {/* Subtotal Item */}
                        <div className="min-w-[80px] text-right">
                          <p className="font-bold text-[#333D29]">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        {/* Botón Eliminar */}
                        <button
                          onClick={() => onRemoveItem(item.product._id)}
                          className="text-red-500 transition-colors hover:text-red-700"
                          title="Eliminar producto"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* RESUMEN DEL PEDIDO */}
                <div className="rounded-xl border border-[#A4AC86] bg-[#EBECE2]/30 p-6">
                  <div className="flex flex-col items-end gap-4">
                    <div className="flex items-center gap-12 border-b border-[#A4AC86] pb-4 text-xl">
                      <span className="font-medium text-[#656D4A]">
                        Total a pagar:
                      </span>
                      <span className="font-bold text-[#582F0E]">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={onCheckout}
                      className="rounded-lg bg-[#582F0E] px-8 py-3 text-lg font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#7F4F24]"
                    >
                      Tramitar Pedido
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
