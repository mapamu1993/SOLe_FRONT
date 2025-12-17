import { useMyOrdersQuery } from "../hooks/useOrdersQuery";
import { OrdersListDesign } from "../components/OrdersListDesign";

const OrdersPage = () => {
  const { data: orders, isLoading, isError } = useMyOrdersQuery();

  return (
    <OrdersListDesign
      orders={orders}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

export default OrdersPage;