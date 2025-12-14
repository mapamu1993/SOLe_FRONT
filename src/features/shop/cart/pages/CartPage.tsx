import { useMemo } from "react";
import { useCartQuery } from "../hooks/useCartQuery";
import {
  useUpdateCartMutation,
  useRemoveItemMutation,
} from "../hooks/useCartMutations";
// Importamos el nuevo diseño
import { CartListDesign } from "../components/CartListDesign";

const CartPage = () => {
  // --- LÓGICA INTACTA ---
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

  // Handlers simples para conectar lógica con diseño
  const handleUpdateQuantity = (productId: string, change: number) => {
    updateCart({ productId, quantity: change });
  };

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
  };

  const handleCheckout = () => {
    alert("Ir a Checkout (Pendiente)");
  };

  // --- RENDERIZAMOS EL DISEÑO ---
  return (
    <CartListDesign
      items={validItems}
      isLoading={isLoading}
      isError={isError}
      subtotal={subtotal}
      onUpdateQuantity={handleUpdateQuantity}
      onRemoveItem={handleRemoveItem}
      onCheckout={handleCheckout}
    />
  );
};

export default CartPage;