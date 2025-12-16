import { Link } from "react-router-dom";
import { type Order } from "../types/orderTypes";
import { cn } from "@/lib/utils";
import { motion, type Variants } from "framer-motion";
import { 
  IconBox, 
  IconTruck, 
  IconCheck, 
  IconClock, 
  IconArrowLeft, 
  IconShoppingBag,
  IconReceipt
} from "@tabler/icons-react";

interface OrdersListDesignProps {
  orders: Order[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

export const OrdersListDesign = ({
  orders,
  isLoading,
  isError,
}: OrdersListDesignProps) => {
  
  // --- CONFIGURACIÓN DE ESTADOS (Color + Icono + Texto) ---
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "delivered": 
        return { 
          style: "bg-[#333D29] text-white border-transparent", 
          icon: <IconCheck size={14} stroke={3} />, 
          label: "Entregado" 
        };
      case "shipped": 
        return { 
          style: "bg-[#B6AD90] text-[#333D29] border-[#333D29]/10", 
          icon: <IconTruck size={14} />, 
          label: "En camino" 
        };
      case "paid": 
        return { 
          style: "bg-[#EBECE2] text-[#582F0E] border-[#582F0E]/20", 
          icon: <IconReceipt size={14} />, 
          label: "Pagado" 
        };
      default: 
        return { 
          style: "bg-gray-100 text-gray-600 border-gray-200", 
          icon: <IconClock size={14} />, 
          label: "Pendiente" 
        };
    }
  };

  // --- ANIMACIONES ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  };

  return (
    // 1. FONDO BASE (Gris Sole)
    <div className="min-h-screen w-full bg-[#EBECE2] p-4 md:p-8 font-sans pt-24 md:pt-32">
      
      <div className="mx-auto w-full max-w-4xl">
        
        {/* 2. CABECERA */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#333D29] tracking-tight">
              Historial de <span className="italic font-serif text-[#582F0E]">Ruta</span>
            </h1>
            <p className="mt-2 text-[#656D4A] uppercase tracking-widest text-xs font-bold">
              Tus pedidos y equipamiento adquirido
            </p>
          </motion.div>

          <Link to="/tienda">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-full border-2 border-[#333D29]/10 px-6 py-2 text-sm font-bold text-[#333D29] transition-colors hover:bg-[#333D29] hover:text-white hover:border-transparent"
            >
              <IconArrowLeft size={18} />
              Volver a la Tienda
            </motion.button>
          </Link>
        </div>

        {/* ESTADO: CARGANDO */}
        {isLoading && (
          <div className="flex h-64 flex-col items-center justify-center text-[#582F0E]">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#333D29] border-t-transparent mb-4" />
            <p className="font-bold text-lg animate-pulse">Recuperando historial...</p>
          </div>
        )}

        {/* ESTADO: ERROR */}
        {isError && (
          <div className="rounded-[2rem] border border-red-200 bg-red-50 p-10 text-center">
            <p className="font-bold text-xl text-red-800 mb-2"> Error de conexión</p>
            <p className="text-red-600">No pudimos cargar tu historial de pedidos.</p>
          </div>
        )}

        {/* LISTA DE PEDIDOS */}
        {!isLoading && !isError && orders && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {orders.length === 0 ? (
              // EMPTY STATE
              <motion.div 
                variants={itemVariants}
                className="flex flex-col items-center justify-center rounded-[2.5rem] bg-white p-16 text-center shadow-sm"
              >
                <div className="bg-[#F5F5F0] p-6 rounded-full mb-6 text-[#333D29]/40">
                    <IconBox size={64} stroke={1} />
                </div>
                <h3 className="text-2xl font-bold text-[#333D29] mb-2">Aún no hay aventuras aquí</h3>
                <p className="text-[#656D4A] mb-8 max-w-md">Tu historial está vacío. Es el momento perfecto para equiparte para tu próximo viaje.</p>
                <Link to="/tienda">
                  <button className="px-8 py-3 bg-[#582F0E] text-white rounded-full font-bold shadow-lg hover:bg-[#7F4F24] transition-all flex items-center gap-2">
                    <IconShoppingBag size={18} /> Ir a la Tienda
                  </button>
                </Link>
              </motion.div>
            ) : (
              // LISTA REAL
              orders.map((order) => {
                const statusConfig = getStatusConfig(order.status);
                
                return (
                  <motion.div
                    key={order._id}
                    variants={itemVariants}
                    className="group relative overflow-hidden rounded-[2.5rem] bg-white shadow-sm transition-all hover:shadow-xl border border-transparent hover:border-[#B6AD90]/30"
                  >
                    {/* Cabecera del Pedido */}
                    <div className="flex flex-col gap-6 border-b border-[#F5F5F0] bg-[#FAFAF8] p-6 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex flex-col sm:flex-row sm:gap-8 gap-4">
                        <div>
                          <span className="block text-[10px] font-bold uppercase tracking-widest text-[#B6AD90] mb-1">Fecha</span>
                          <span className="text-sm font-bold text-[#333D29]">
                            {new Date(order.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                        <div>
                          <span className="block text-[10px] font-bold uppercase tracking-widest text-[#B6AD90] mb-1">Total</span>
                          <span className="text-lg font-bold text-[#582F0E]">
                            €{order.totalAmount.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between gap-4 sm:justify-end">
                        <span className="text-xs font-mono text-[#656D4A]/60 hidden sm:block">#{order._id.slice(-6).toUpperCase()}</span>
                        <span className={cn(
                            "flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wide", 
                            statusConfig.style
                        )}>
                          {statusConfig.icon}
                          {statusConfig.label}
                        </span>
                      </div>
                    </div>
                    
                    {/* Lista de Items */}
                    <div className="p-6">
                      <ul className="divide-y divide-[#F5F5F0]">
                        {order.items.map((item) => (
                          <li key={item._id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                            <div className="flex items-center gap-4">
                              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5F5F0] text-sm font-bold text-[#333D29] border border-[#EBECE2]">
                                x{item.quantity}
                              </div>
                              <div>
                                <span className="font-bold text-[#333D29] text-lg block">
                                  {item.product?.name || "Producto desconocido"}
                                </span>
                                {/* Opcional: Si tuvieras el precio unitario */}
                                {/* <span className="text-xs text-[#656D4A]">Ref: {item.product._id.slice(-4)}</span> */}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};