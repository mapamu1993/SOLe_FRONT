import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";

// HOOKS
import { useCartQuery } from "../hooks/useCartQuery";
import {
  useUpdateCartMutation,
  useRemoveItemMutation,
  useCheckoutMutation,
} from "../hooks/useCartMutations";

// COMPONENTES
import { CartListDesign } from "../components/CartListDesign";

const CartPage = () => {
  const { enqueueSnackbar } = useSnackbar();

  // 1. OBTENCIÓN DE DATOS (Query)
  const { data: cart, isLoading, isError } = useCartQuery();

  // 2. MUTACIONES (Acciones)
  const { mutate: updateCart } = useUpdateCartMutation();
  const { mutate: removeItem } = useRemoveItemMutation();
  const { mutate: checkout, isPending: isCheckoutLoading, isSuccess: isCheckoutSuccess } = useCheckoutMutation();

  // Estados locales para el modal de checkout
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  // Guardamos los datos de la orden exitosa para mostrarlos en la pantalla de "Gracias"
  const [lastOrder, setLastOrder] = useState<any>(null);

  // --- LÓGICA DE NEGOCIO ---

  // Calcular subtotal
  const subtotal = useMemo(() => {
    if (!cart?.items) return 0;
    return cart.items.reduce((acc, item) => {
      // Protección: si el producto fue borrado de la DB pero sigue en el carrito
      if (!item.product) return acc; 
      return acc + item.product.price * item.quantity;
    }, 0);
  }, [cart]);

  // Filtrar items inválidos (por si acaso un kit/producto fue eliminado de la base de datos)
  const validItems = useMemo(() => {
    return cart?.items.filter((item) => item.product !== null) || [];
  }, [cart]);

  // Handlers
  const handleUpdateQuantity = (productId: string, change: number) => {
    updateCart({ productId, quantity: change });
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
          // Simulamos datos de orden para la pantalla de éxito, ya que React Query invalidará el carrito y lo dejará vacío
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
      
      // Checkout Props
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