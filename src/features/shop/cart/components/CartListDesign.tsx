import { Link } from "react-router-dom";
import { type CartItem } from "../types/cartTypes";
import { IMAGE_URL } from "../../../../config/constants";
import { cn } from "@/lib/utils"; // Asegúrate de que esta ruta sea correcta en tu proyecto
import { IconTrash, IconMinus, IconPlus, IconArrowRight, IconShoppingBag } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

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
  
  // Animación de cascada para la lista
  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen w-full bg-[#EBECE2] p-4 md:p-8 font-sans pt-24 md:pt-32">
      <div className="mx-auto w-full max-w-7xl">
        
        {/* TÍTULO */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#333D29] tracking-tight">
            Tu <span className="italic font-serif text-[#582F0E]">Mochila</span>
          </h1>
          <p className="mt-2 text-[#656D4A] uppercase tracking-widest text-xs font-bold">
            {items.length} {items.length === 1 ? "Artículo" : "Artículos"} listos para la ruta
          </p>
        </motion.div>

        {/* ESTADO DE CARGA */}
        {isLoading && (
          <div className="flex h-64 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#333D29] border-t-transparent"/>
          </div>
        )}

        {/* ESTADO DE ERROR */}
        {isError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
            ⚠️ No pudimos cargar tu carrito. Por favor, recarga la página.
          </div>
        )}

        {/* CONTENIDO PRINCIPAL */}
        {!isLoading && !isError && (
          <>
            {items.length === 0 ? (
              // CARRITO VACÍO
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center rounded-[3rem] bg-white p-16 text-center shadow-xl border border-[#333D29]/5"
              >
                <div className="bg-[#EBECE2] p-6 rounded-full mb-6">
                    <IconShoppingBag size={64} className="text-[#333D29] opacity-50"/>
                </div>
                <h2 className="text-2xl font-bold text-[#333D29] mb-2">Tu mochila está vacía</h2>
                <p className="text-[#656D4A] mb-8">¿Listo para equiparte para la próxima aventura?</p>
                <Link to="/tienda">
                  <button className="group relative px-8 py-3 bg-[#333D29] text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 shadow-lg">
                    <span className="relative z-10 flex items-center gap-2">
                        Ir a la Tienda <IconArrowRight size={18}/>
                    </span>
                  </button>
                </Link>
              </motion.div>
            ) : (
              // LAYOUT AMAZON (2 Columnas)
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative items-start">
                
                {/* IZQUIERDA: LISTA DE PRODUCTOS */}
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
                          exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
                          className="group relative flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow border border-transparent hover:border-[#B6AD90]/30"
                        >
                          {/* Imagen */}
                          <div className="h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-[#EBECE2] relative">
                            <img
                              src={item.product.image?.startsWith('http') ? item.product.image : `${IMAGE_URL}/uploads/products/${item.product.image}`}
                              alt={item.product.name}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start">
                                <h3 className="text-xl font-bold text-[#333D29] mb-1 leading-tight">{item.product.name}</h3>
                                <p className="font-bold text-xl text-[#582F0E]">
                                  ${(item.product.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                              <p className="text-sm text-[#656D4A] font-medium">Unidad: ${item.product.price}</p>
                            </div>

                            {/* Controles */}
                            <div className="mt-4 flex items-center justify-between">
                              <div className="flex items-center gap-1 bg-[#F5F5F0] rounded-full p-1 border border-[#EBECE2]">
                                <button
                                  onClick={() => onUpdateQuantity(item.product._id, -1)}
                                  disabled={item.quantity <= 1}
                                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#333D29] hover:bg-[#333D29] hover:text-white transition-colors disabled:opacity-50 shadow-sm"
                                >
                                  <IconMinus size={14} />
                                </button>
                                <span className="w-8 text-center font-bold text-[#333D29] text-sm">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.product._id, 1)}
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
                                <span className="hidden sm:inline">Eliminar</span>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* DERECHA: RESUMEN STICKY (Tipo Amazon) */}
                <div className="lg:col-span-1 sticky top-32">
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-[#333D29] p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden"
                  >
                    {/* Decoración de fondo */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-[#B6AD90] opacity-10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

                    <h2 className="text-2xl font-bold mb-6 relative z-10">Resumen</h2>

                    <div className="space-y-4 mb-8 text-[#EBECE2]/80 text-sm relative z-10">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Envío estimado</span>
                        <span className="text-[#B6AD90] font-medium">Gratis</span>
                      </div>
                      <div className="h-px w-full bg-white/10 my-4"></div>
                      <div className="flex justify-between items-end text-white">
                        <span className="font-bold text-lg">Total</span>
                        <span className="font-bold text-4xl">${subtotal.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-[#EBECE2]/50 text-right">Impuestos incluidos</p>
                    </div>

                    {/* BOTÓN CHECKOUT (Estilo Swipe) */}
                    <button
                      onClick={onCheckout}
                      className="group relative w-full h-14 bg-[#EBECE2] text-[#333D29] font-bold text-sm uppercase tracking-widest rounded-full overflow-hidden shadow-lg hover:shadow-[#B6AD90]/20 transition-all z-10"
                    >
                      <span className="absolute inset-0 w-full h-full bg-[#B6AD90] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100 ease-out" />
                      <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-[#333D29] transition-colors">
                        Tramitar Pedido <IconArrowRight size={20}/>
                      </span>
                    </button>

                    <div className="mt-6 flex justify-center gap-3 opacity-30">
                       {/* Iconos de tarjetas simulados */}
                       <div className="w-8 h-5 bg-white rounded-sm"></div>
                       <div className="w-8 h-5 bg-white rounded-sm"></div>
                       <div className="w-8 h-5 bg-white rounded-sm"></div>
                    </div>
                  </motion.div>
                </div>

              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};