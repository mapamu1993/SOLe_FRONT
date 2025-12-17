import { useState, useMemo } from "react";

// HOOKS
import { useCartQuery } from "../hooks/useCartQuery";
import {
  useUpdateCartMutation,
  useRemoveItemMutation,
  useCheckoutMutation,
} from "../hooks/useCartMutations";

import { CartListDesign } from "../components/CartListDesign";

const CartPage = () => {
  const { data: cart, isLoading, isError } = useCartQuery();

  const { mutate: updateCart } = useUpdateCartMutation();
  const { mutate: removeItem } = useRemoveItemMutation();
  const { mutate: checkout, isPending: isCheckoutLoading } =
    useCheckoutMutation();

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<any>(null);

  // --- LÓGICA DE NEGOCIO ---

  const subtotal = useMemo(() => {
    if (!cart?.items) return 0;
    return cart.items.reduce((acc, item) => {
      if (!item.product) return acc;
      return acc + (item.product.price || 0) * item.quantity;
    }, 0);
  }, [cart]);

  const validItems = useMemo(() => {
    return cart?.items.filter((item) => item.product !== null) || [];
  }, [cart]);

  const handleUpdateQuantity = (
    productId: string,
    change: number,
    productModel?: "Product" | "Kit"
  ) => {
    console.log("Frontend Updating Quantity:", {
      productId,
      change,
      productModel,
    });
    updateCart({ productId, quantity: change, productModel });
  };

  const handleRemoveItem = (productId: string) => {
    if (window.confirm("¿Seguro que quieres sacar este item de tu mochila?")) {
      removeItem(productId);
    }
  };

  const handleCheckoutClick = () => {
    setIsAddressModalOpen(true);
  };

  const handleConfirmCheckout = (address: string) => {
    checkout(
      { shippingAddress: address },
      {
        onSuccess: () => {
          setIsAddressModalOpen(false);
          setLastOrder({
            shippingAddress: address,
            totalAmount: subtotal,
          });
        },
      }
    );
  };

  // --- RENDERIZADO ---
  return (
    <CartListDesign
      items={validItems}
      isLoading={isLoading}
      isError={isError}
      subtotal={subtotal}
      onUpdateQuantity={handleUpdateQuantity}
      onRemoveItem={handleRemoveItem}
      onCheckoutClick={handleCheckoutClick}
      onConfirmCheckout={handleConfirmCheckout}
      isCheckoutLoading={isCheckoutLoading}
      isAddressModalOpen={isAddressModalOpen}
      setIsAddressModalOpen={setIsAddressModalOpen}
      successOrder={lastOrder}
    />
  );
};

export default CartPage;
