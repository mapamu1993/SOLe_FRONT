import { useMyOrdersQuery } from "../hooks/useOrdersQuery";

const OrdersPage = () => {
  const { data: orders, isLoading, isError } = useMyOrdersQuery();

  if (isLoading) return <div>Cargando pedidos...</div>;
  if (isError) return <div>Error al obtener pedidos.</div>;

  return (
    <div>
      <h1>Mis Pedidos</h1>
      {!orders || orders.length === 0 ? (
        <p>No tienes pedidos.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {orders.map((order) => (
            <li
              key={order._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>ID: {order._id}</strong>
                <span>Estado: {order.status}</span>
              </div>
              <p>Fecha: {new Date(order.createdAt).toLocaleDateString()}</p>
              <ul>
                {order.items.map((item) => (
                  <li key={item._id}>
                    {item.product?.name || "Producto desconocido"} x{" "}
                    {item.quantity}
                  </li>
                ))}
              </ul>
              <h4>Total: ${order.totalAmount.toFixed(2)}</h4>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersPage;
