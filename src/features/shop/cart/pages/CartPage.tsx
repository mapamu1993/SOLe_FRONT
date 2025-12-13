import { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useCartQuery } from "../hooks/useCartQuery";
import {
  useUpdateCartMutation,
  useRemoveItemMutation,
} from "../hooks/useCartMutations";
import type { CartItem } from "../types/cartTypes";

const CartPage = () => {
  const { data: cart, isLoading, isError } = useCartQuery();
  const { mutate: updateCart } = useUpdateCartMutation();
  const { mutate: removeItem } = useRemoveItemMutation();

  // Filtrar items que tienen producto (por si se borró de la BD)
  const validItems = useMemo(() => {
    if (!cart?.items) return [];
    return cart.items.filter((item) => item.product != null);
  }, [cart]);

  const subtotal = useMemo(() => {
    return validItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }, [validItems]);

  if (isLoading) return <div>Cargando carrito...</div>;
  if (isError) return <div>Error al cargar el carrito.</div>;

  if (validItems.length === 0) {
    return (
      <div>
        <h2>El carrito está vacío</h2>
        <RouterLink to="/tienda">Ir a la tienda</RouterLink>
      </div>
    );
  }

  return (
    <div>
      <h1>Mi Carrito</h1>
      <table
        style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}
      >
        <thead>
          <tr style={{ borderBottom: "1px solid #ccc" }}>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {validItems.map((item: CartItem) => (
            <tr key={item._id} style={{ borderBottom: "1px solid #eee" }}>
              <td>{item.product.name}</td>
              <td>${item.product.price}</td>
              <td>
                <button
                  onClick={() =>
                    updateCart({ productId: item.product._id, quantity: -1 })
                  }
                >
                  -
                </button>
                <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                <button
                  onClick={() =>
                    updateCart({ productId: item.product._id, quantity: 1 })
                  }
                >
                  +
                </button>
              </td>
              <td>${(item.product.price * item.quantity).toFixed(2)}</td>
              <td>
                <button
                  onClick={() => removeItem(item.product._id)}
                  style={{ color: "red" }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <h3>Total: ${subtotal.toFixed(2)}</h3>
        <button onClick={() => alert("Ir a Checkout (Pendiente)")}>
          Tramitar Pedido
        </button>
      </div>
    </div>
  );
};

export default CartPage;
