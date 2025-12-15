import { useMemo } from "react";
import { useCartQuery } from "../hooks/useCartQuery";
import {
  useUpdateCartMutation,
  useRemoveItemMutation,
} from "../hooks/useCartMutations";
// IMPORTANTE: Aquí importamos el diseño visual estilo Amazon que creamos antes
import { CartListDesign } from "../components/CartListDesign";

const CartPage = () => {
  // 1. LÓGICA DE DATOS (El Cerebro)
  const { data: cart, isLoading, isError } = useCartQuery();
  const { mutate: updateCart } = useUpdateCartMutation();
  const { mutate: removeItem } = useRemoveItemMutation();

  // 2. FILTRADO SEGURO
  // Nos aseguramos de que no haya productos "fantasma" (nulos)
  const validItems = useMemo(() => {
    if (!cart?.items) return [];
    return cart.items.filter((item) => item.product != null);
  }, [cart]);

  // 3. CÁLCULO DEL TOTAL
  const subtotal = useMemo(() => {
    return validItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }, [validItems]);

  // 4. FUNCIONES DE ACCIÓN
  const handleUpdateQuantity = (productId: string, change: number) => {
    updateCart({ productId, quantity: change });
  };

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
  };

  const handleCheckout = () => {
    // Aquí conectarás tu pasarela de pago (Stripe, PayPal, etc.) más adelante
    alert("¡Procesando pedido! (Lógica de pago pendiente)");
  };

  // 5. RENDERIZADO DEL DISEÑO
  // Le pasamos todo al componente visual "CartListDesign"
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