import { useQuery } from "@tanstack/react-query";
import { fetchCartService } from "../services/cartService";
import type { Cart, CartItem } from "../types/cartTypes";
import { useAuth } from "../../../auth/context/auth.context";

// Hook para obtener el carrito de compras
export const useCartQuery = () => {
  const { isAuthenticated } = useAuth();

  return useQuery<Cart, Error>({
    queryKey: ["cart"],
    queryFn: fetchCartService,
    retry: false,
    enabled: isAuthenticated,
  });
};

// Hook para obtener la cantidad total de items en el carrito
export const useCartCount = () => {
  const { data: cart, isLoading } = useCartQuery();

  const count =
    cart?.items?.reduce(
      (acc: number, item: CartItem) => acc + item.quantity,
      0
    ) || 0;

  return { count, isLoading };
};
