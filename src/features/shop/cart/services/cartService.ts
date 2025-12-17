import axiosClient from "../../../../api/axios.client";
import { API_ROUTES } from "../../../../config/constants";
import { type Cart } from "../types/cartTypes";

interface UpdateCartData {
  productId: string;
  quantity: number;
  productModel?: "Product" | "Kit";
}

interface CheckoutResponse {
  status: "success";
  data: { order: any };
}

// Servicio para obtener el carrito del usuario
export const fetchCartService = async (): Promise<Cart> => {
  const { data } = await axiosClient.get(API_ROUTES.CART);
  return data.data.cart;
};

// Servicio para actualizar el carrito del usuario
export const updateCartService = async (data: UpdateCartData) => {
  const response = await axiosClient.post(`${API_ROUTES.CART}/add`, data);
  return response.data;
};

// Servicio para eliminar un ítem del carrito
export const removeItemFromCartService = async (productId: string) => {
  const response = await axiosClient.delete(`${API_ROUTES.CART}/${productId}`);
  return response.data;
};

// Servicio para realizar el checkout del carrito
export const checkoutService = async (
  shippingAddress: string
): Promise<CheckoutResponse> => {
  const response = await axiosClient.post(`${API_ROUTES.CART}/checkout`, {
    shippingAddress,
  });
  return response.data;
};
