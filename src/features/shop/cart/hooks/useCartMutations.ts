import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { AxiosError } from "axios";
import {
  updateCartService,
  removeItemFromCartService,
} from "../services/cartService";
import { checkoutService } from "../services/cartService";

const CART_QUERY_KEY = ["cart"];
const ORDERS_QUERY_KEY = ["orders"];
type CheckoutData = { shippingAddress: string };

interface ErrorResponse {
  message: string;
}

export const useUpdateCartMutation = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: updateCartService,

    onSuccess: (_, variables) => {
      const message =
        variables.quantity > 0
          ? "Carrito actualizado."
          : "Item eliminado del carrito.";
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
      enqueueSnackbar(message, { variant: "success" });
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error.response?.data?.message || "Error al actualizar el carrito.";
      enqueueSnackbar(errorMessage, { variant: "error" });
    },
  });
};

export const useRemoveItemMutation = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: removeItemFromCartService,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
      enqueueSnackbar("Producto eliminado del carrito.", { variant: "info" });
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error.response?.data?.message || "Error al eliminar el producto.";
      enqueueSnackbar(errorMessage, { variant: "error" });
    },
  });
};

export const useCheckoutMutation = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (data: CheckoutData) => checkoutService(data.shippingAddress),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });
      enqueueSnackbar("Checkout realizado con éxito.", { variant: "success" });
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error.response?.data?.message || "Error al realizar el checkout.";
      enqueueSnackbar(errorMessage, { variant: "error" });
    },
  });
};

// Alias para mantener compatibilidad si se usa en otros lados
export const useAddToCartMutation = useUpdateCartMutation;
