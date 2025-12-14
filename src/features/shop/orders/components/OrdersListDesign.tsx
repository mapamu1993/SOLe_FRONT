import { Link } from "react-router-dom";
import { type Order } from "../types/orderTypes";
import { cn } from "@/lib/utils";

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
  
  // Función auxiliar para colorear el estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-green-100 text-green-800 border-green-200";
      case "shipped": return "bg-blue-100 text-blue-800 border-blue-200";
      case "paid": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Función auxiliar para traducir el estado
  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: "Pendiente",
      paid: "Pagado",
      shipped: "Enviado",
      delivered: "Entregado",
    };
    return labels[status] || status;
  };

  return (
    // FONDO GENERAL (Beige verdoso)
    <div className="min-h-screen w-full bg-[#C2C5AA] p-4 font-sans">
      
      {/* CONTENEDOR PRINCIPAL */}
      <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white p-6 shadow-2xl border border-[#A4AC86] sm:p-8">
        
        {/* CABECERA */}
        <div className="mb-8 flex items-center justify-between border-b border-[#C2C5AA] pb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#333D29]">Mis Pedidos</h1>
            <p className="mt-2 text-[#656D4A]">
              Historial de tus compras recientes
            </p>
          </div>
          <Link
            to="/tienda"
            className="text-sm font-medium text-[#7F4F24] hover:underline"
          >
            Volver a la tienda
          </Link>
        </div>

        {/* ESTADO: CARGANDO */}
        {isLoading && (
          <div className="flex h-64 flex-col items-center justify-center text-[#582F0E]">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#A4AC86] border-t-[#582F0E]" />
            <p className="mt-4 font-medium">Cargando tus pedidos...</p>
          </div>
        )}

        {/* ESTADO: ERROR */}
        {isError && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-700">
            <p className="font-bold text-lg">⚠️ No pudimos cargar tus pedidos</p>
            <p>Por favor, inténtalo de nuevo más tarde.</p>
          </div>
        )}

        {/* LISTA DE PEDIDOS */}
        {!isLoading && !isError && orders && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#A4AC86] bg-[#EBECE2]/50 py-16 text-center">
                <p className="text-lg font-medium text-[#333D29]">Aún no has realizado ningún pedido.</p>
                <Link to="/tienda" className="mt-4 inline-block rounded-lg bg-[#582F0E] px-6 py-2 text-white transition hover:bg-[#7F4F24]">
                  Ir a comprar
                </Link>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="overflow-hidden rounded-xl border border-[#A4AC86] bg-white shadow-sm transition-all hover:shadow-md"
                >
                  {/* Cabecera del Pedido */}
                  <div className="flex flex-col gap-4 bg-[#EBECE2] p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col sm:flex-row sm:gap-6">
                      <div>
                        <span className="block text-xs font-bold uppercase text-[#656D4A]">Fecha</span>
                        <span className="text-sm text-[#333D29]">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="mt-2 sm:mt-0">
                        <span className="block text-xs font-bold uppercase text-[#656D4A]">Total</span>
                        <span className="text-sm font-bold text-[#582F0E]">
                          ${order.totalAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <span className="text-xs font-mono text-[#656D4A]">ID: {order._id.slice(-6).toUpperCase()}</span>
                      <span className={cn("rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide", getStatusColor(order.status))}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                  </div>

                  {/* Lista de Items del Pedido */}
                  <div className="p-4">
                    <ul className="divide-y divide-[#EBECE2]">
                      {order.items.map((item) => (
                        <li key={item._id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#F5F5F0] text-xs font-bold text-[#A4AC86]">
                              x{item.quantity}
                            </div>
                            <span className="font-medium text-[#333D29]">
                              {item.product?.name || "Producto desconocido"}
                            </span>
                          </div>
                          {/* Si tuvieras el precio unitario en el item, podrías ponerlo aquí */}
                        </li>
                      ))}
                    </ul>
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