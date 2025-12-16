import { Link } from "react-router-dom";
import { type CartItem } from "../types/cartTypes";
import {
  IconTrash,
  IconMinus,
  IconPlus,
  IconArrowRight,
  IconShoppingBag,
  IconTruckDelivery,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { getImageUrl } from "../../../../utils/imageUtil";
import { useState } from "react";

interface CartListDesignProps {
  items: CartItem[];
  isLoading: boolean;
  isError: boolean;
  subtotal: number;
  onUpdateQuantity: (productId: string, change: number) => void;
  onRemoveItem: (productId: string) => void;

  // Nuevos props para el flujo de checkout
  onCheckoutClick: () => void;
  onConfirmCheckout: (address: string) => void;
  isCheckoutLoading: boolean;
  isAddressModalOpen: boolean;
  setIsAddressModalOpen: (isOpen: boolean) => void;
  successOrder: any | null;
}

export const CartListDesign = ({
  items,
  isLoading,
  isError,
  subtotal,
  onUpdateQuantity,
  onRemoveItem,
  onCheckoutClick,
  onConfirmCheckout,
  isCheckoutLoading,
  isAddressModalOpen,
  setIsAddressModalOpen,
  successOrder,
}: CartListDesignProps) => {
  const [addressInput, setAddressInput] = useState("");

  // Animaciones
  const listVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // --- 1. PANTALLA DE ÉXITO ---
  if (successOrder) {
    return (
      <div className="min-h-screen w-full bg-[#EBECE2] flex items-center justify-center p-4 pt-24">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white max-w-2xl w-full rounded-[2.5rem] p-8 md:p-12 shadow-2xl text-center relative overflow-hidden"
        >
          {/* Confeti visual decorativo */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#582F0E] via-[#B6AD90] to-[#333D29]"></div>

          <div className="mx-auto w-24 h-24 bg-[#333D29] rounded-full flex items-center justify-center mb-6 shadow-lg">
            <IconCheck size={48} className="text-white" stroke={2} />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#333D29] mb-4">
            ¡Gracias por tu compra!
          </h1>

          <p className="text-[#656D4A] text-lg mb-8">
            Tu pedido ha sido procesado correctamente. Hemos enviado un email de
            confirmación a tu correo con todos los detalles.
          </p>

          <div className="bg-[#EBECE2]/50 rounded-2xl p-6 mb-8 text-left border border-[#333D29]/10">
            <h3 className="font-bold text-[#333D29] mb-2 text-sm uppercase tracking-wider">
              Detalles del envío
            </h3>
            <p className="text-[#582F0E] font-medium flex items-start gap-2">
              <IconTruckDelivery size={20} className="shrink-0 mt-0.5" />
              {successOrder.shippingAddress}
            </p>
            <div className="mt-4 pt-4 border-t border-[#333D29]/10 flex justify-between items-center">
              <span className="text-[#656D4A] font-medium">Total Pagado</span>
              {/* CAMBIO DE MONEDA AQUÍ */}
              <span className="text-2xl font-bold text-[#333D29]">
                {successOrder.totalAmount?.toFixed(2)}€
              </span>
            </div>
          </div>

          <Link to="/tienda">
            <button className="px-8 py-3 bg-[#333D29] text-white font-bold rounded-full hover:bg-[#582F0E] transition-all hover:scale-105 shadow-lg">
              Volver a la Tienda
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  // --- 2. RENDERIZADO PRINCIPAL ---
  return (
    <div className="min-h-screen w-full bg-[#EBECE2] p-4 md:p-8 font-sans pt-24 md:pt-32">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        {!isLoading && !isError && items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#333D29] tracking-tight">
              Tu{" "}
              <span className="italic font-serif text-[#582F0E]">Mochila</span>
            </h1>
            <p className="mt-2 text-[#656D4A] uppercase tracking-widest text-xs font-bold">
              {items.length} {items.length === 1 ? "Artículo" : "Artículos"}{" "}
              listos para la ruta
            </p>
          </motion.div>
        )}

        {/* Loading / Error */}
        {isLoading && (
          <div className="flex h-64 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#333D29] border-t-transparent" />
          </div>
        )}
        {isError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
            ⚠️ No pudimos cargar tu carrito. Por favor, recarga la página.
          </div>
        )}

        {/* Contenido */}
        {!isLoading && !isError && (
          <>
            {items.length === 0 ? (
              // --- PANTALLA CARRITO VACÍO ---
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center rounded-[3rem] bg-white p-16 text-center shadow-xl border border-[#333D29]/5 min-h-[50vh]"
              >
                <div className="bg-[#EBECE2] p-6 rounded-full mb-6">
                  <IconShoppingBag
                    size={64}
                    className="text-[#333D29] opacity-50"
                  />
                </div>
                <h2 className="text-3xl font-bold text-[#333D29] mb-4">
                  Tu mochila está vacía
                </h2>
                <p className="text-[#656D4A] mb-8 max-w-md mx-auto">
                  Parece que aún no has añadido equipamiento para tu próxima
                  aventura. ¡Explora nuestros kits y productos!
                </p>
                <Link to="/tienda">
                  <button className="group relative px-8 py-4 bg-[#333D29] text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 shadow-lg">
                    <span className="relative z-10 flex items-center gap-2">
                      Ir a la Tienda <IconArrowRight size={18} />
                    </span>
                  </button>
                </Link>
              </motion.div>
            ) : (
              // --- LISTA DE PRODUCTOS ---
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative items-start">
                <div className="lg:col-span-2">
                  <motion.div
                    variants={listVariants}
                    initial="hidden"
                    animate="show"
                    className="space-y-4"
                  >
                    <AnimatePresence mode="popLayout">
                      {items.map((item) => (
                        <motion.div
                          layout
                          key={item._id}
                          variants={itemVariants}
                          exit={{
                            opacity: 0,
                            x: -50,
                            transition: { duration: 0.2 },
                          }}
                          className="group relative flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow border border-transparent hover:border-[#B6AD90]/30"
                        >
                          <div className="h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-[#EBECE2]">
                            <img
                              src={getImageUrl(item.product.image)}
                              alt={item.product.name}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </div>
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start">
                                <h3 className="text-xl font-bold text-[#333D29] mb-1 leading-tight">
                                  {item.product.name}
                                </h3>
                                {/* CAMBIO DE MONEDA AQUÍ */}
                                <p className="font-bold text-xl text-[#582F0E]">
                                  {(item.product.price * item.quantity).toFixed(
                                    2
                                  )}
                                  €
                                </p>
                              </div>
                              {/* CAMBIO DE MONEDA AQUÍ */}
                              <p className="text-sm text-[#656D4A] font-medium">
                                Unidad: {item.product.price}€
                              </p>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                              <div className="flex items-center gap-1 bg-[#F5F5F0] rounded-full p-1 border border-[#EBECE2]">
                                <button
                                  onClick={() =>
                                    onUpdateQuantity(item.product._id, -1)
                                  }
                                  disabled={item.quantity <= 1}
                                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#333D29] hover:bg-[#333D29] hover:text-white transition-colors disabled:opacity-50 shadow-sm"
                                >
                                  <IconMinus size={14} />
                                </button>
                                <span className="w-8 text-center font-bold text-[#333D29] text-sm">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    onUpdateQuantity(item.product._id, 1)
                                  }
                                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#333D29] hover:bg-[#333D29] hover:text-white transition-colors shadow-sm"
                                >
                                  <IconPlus size={14} />
                                </button>
                              </div>
                              <button
                                onClick={() => onRemoveItem(item.product._id)}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#656D4A] hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                              >
                                <IconTrash size={16} />
                                <span className="hidden sm:inline">
                                  Eliminar
                                </span>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* --- RESUMEN DE COMPRA --- */}
                <div className="lg:col-span-1 sticky top-32">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-[#333D29] p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-40 h-40 bg-[#B6AD90] opacity-10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                    <h2 className="text-2xl font-bold mb-6 relative z-10">
                      Resumen
                    </h2>
                    <div className="space-y-4 mb-8 text-[#EBECE2]/80 text-sm relative z-10">
                      {/* CAMBIO DE MONEDA AQUÍ */}
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="text-white font-medium">
                          {subtotal.toFixed(2)}€
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Envío estimado</span>
                        <span className="text-[#B6AD90] font-medium">
                          Gratis
                        </span>
                      </div>
                      <div className="h-px w-full bg-white/10 my-4"></div>
                      {/* CAMBIO DE MONEDA AQUÍ */}
                      <div className="flex justify-between items-end text-white">
                        <span className="font-bold text-lg">Total</span>
                        <span className="font-bold text-4xl">
                          {subtotal.toFixed(2)}€
                        </span>
                      </div>
                      <p className="text-xs text-[#EBECE2]/50 text-right">
                        Impuestos incluidos
                      </p>
                    </div>

                    {/* Botón para iniciar el proceso de checkout */}
                    <button
                      onClick={onCheckoutClick}
                      disabled={items.length === 0}
                      className="group relative w-full h-14 bg-[#EBECE2] text-[#333D29] font-bold text-sm uppercase tracking-widest rounded-full overflow-hidden shadow-lg hover:shadow-[#B6AD90]/20 transition-all z-10 disabled:opacity-50"
                    >
                      <span className="absolute inset-0 w-full h-full bg-[#B6AD90] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100 ease-out" />
                      <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-[#333D29] transition-colors">
                        Tramitar Pedido <IconArrowRight size={20} />
                      </span>
                    </button>
                  </motion.div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* --- MODAL DE DIRECCIÓN --- */}
      <AnimatePresence>
        {isAddressModalOpen && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            {/* Backdrop (Fondo oscuro) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsAddressModalOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2rem] p-6 md:p-8 shadow-2xl z-10 overflow-hidden"
            >
              <button
                onClick={() => setIsAddressModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-[#333D29] transition-colors"
              >
                <IconX size={20} />
              </button>

              <h2 className="text-2xl font-bold text-[#333D29] mb-2 pr-8">
                ¿Dónde te lo enviamos?
              </h2>
              <p className="text-[#656D4A] text-sm mb-6">
                Ingresa tu dirección para recibir tu equipo.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#333D29] uppercase tracking-wider mb-2">
                    Dirección de Envío
                  </label>
                  <textarea
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    placeholder="Calle, Número, Ciudad, Código Postal..."
                    className="w-full bg-[#F5F5F0] rounded-xl p-4 border border-transparent focus:border-[#B6AD90] focus:bg-white transition-all outline-none text-[#333D29] min-h-[100px] resize-none text-sm"
                    autoFocus
                  />
                </div>

                <button
                  onClick={() => onConfirmCheckout(addressInput)}
                  disabled={!addressInput.trim() || isCheckoutLoading}
                  className="w-full py-4 bg-[#333D29] text-white font-bold rounded-xl hover:bg-[#582F0E] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-lg"
                >
                  {isCheckoutLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Confirmar Compra <IconArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
