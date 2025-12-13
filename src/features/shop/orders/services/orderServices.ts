import axiosClient from "../../../../api/axios.client";
import { API_ROUTES } from "../../../../config/constants";
import { type Order } from "../types/orderTypes";

export const getMyOrdersService = async (): Promise<Order[]> => {
  const { data } = await axiosClient.get(`${API_ROUTES.ORDERS}/myorders`);
  return data.data.orders;
};

export const getOrderByIdService = async (id: string): Promise<Order> => {
  const { data } = await axiosClient.get(`${API_ROUTES.ORDERS}/${id}`);
  return data.data.order;
};
