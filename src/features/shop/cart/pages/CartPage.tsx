import { useMemo, useState } from "react";
import { useCartQuery } from "../hooks/useCartQuery";
import {
  useUpdateCartMutation,
  useRemoveItemMutation,
  useCheckoutMutation
} from "../hooks/useCartMutations";
import { CartListDesign } from "../components/CartListDesign";

const CartPage = () => {
  // 1. ESTADOS LOCALES PARA EL FLUJO
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [successOrder, setSuccessOrder] = useState<any | null>(null); // Guardamos la orden creada

  // 2. LÓGICA DE DATOS (Queries & Mutations)
  const { data: cart, isLoading, isError } = useCartQuery();
  const { mutate: updateCart } = useUpdateCartMutation();
  const { mutate: removeItem } = useRemoveItemMutation();
  const checkoutMutation = useCheckoutMutation();

  // 3. FILTRADO SEGURO DE ITEMS
  const validItems = useMemo(() => {
    if (!cart?.items) return [];
    return cart.items.filter((item) => item.product != null);
  }, [cart]);

  // 4. CÁLCULO DEL TOTAL
  const subtotal = useMemo(() => {
    return validItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }, [validItems]);

  // 5. HANDLERS
  const handleUpdateQuantity = (productId: string, change: number) => {
    updateCart({ productId, quantity: change });
  };

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
  };

  // Paso 1 del Checkout: Abrir modal de dirección
  const handleInitiateCheckout = () => {
    setIsAddressModalOpen(true);
  };

  // Paso 2 del Checkout: Confirmar compra con dirección
  const handleConfirmCheckout = async (shippingAddress: string) => {
    try {
      // Usamos mutateAsync para esperar la respuesta del backend
      const response = await checkoutMutation.mutateAsync({ shippingAddress });
      
      // El backend devuelve { status: "success", data: { order: ... } }
      // Guardamos la orden para mostrar el resumen final
      if (response && response.data && response.data.order) {
        setSuccessOrder(response.data.order);
        setIsAddressModalOpen(false); // Cerramos el modal
      }
    } catch (error) {
      console.error("Error en checkout:", error);
      // El hook useCheckoutMutation ya maneja las notificaciones de error (snackbars)
    }
  };

  return (
    <CartListDesign
      items={validItems}
      isLoading={isLoading}
      isError={isError}
      subtotal={subtotal}
      onUpdateQuantity={handleUpdateQuantity}
      onRemoveItem={handleRemoveItem}
      onCheckoutClick={handleInitiateCheckout} // Abre el modal
      onConfirmCheckout={handleConfirmCheckout} // Ejecuta la compra
      isCheckoutLoading={checkoutMutation.isPending}
      isAddressModalOpen={isAddressModalOpen}
      setIsAddressModalOpen={setIsAddressModalOpen}
      successOrder={successOrder} // Si existe, mostramos pantalla de éxito
    />
  );
};

export default CartPage;