import { useMyOrdersQuery } from "../hooks/useOrdersQuery";
// Importamos el nuevo diseño
import { OrdersListDesign } from "../components/OrdersListDesign";

const OrdersPage = () => {
  // --- LÓGICA INTACTA ---
  const { data: orders, isLoading, isError } = useMyOrdersQuery();

  // --- RENDERIZAMOS EL DISEÑO ---
  return (
    <OrdersListDesign
      orders={orders}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

export default OrdersPage;