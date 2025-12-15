import axiosClient from "../../../../api/axios.client";
import { API_ROUTES } from "../../../../config/constants";
import { type Product } from "../../products/types/productTypes";

// El servicio devuelve Promesa de Product[] porque la DB guarda Productos.
export const getAllKitsService = async (): Promise<Product[]> => {
  // Petición a api/kits
  const { data } = await axiosClient.get(API_ROUTES.KITS);
  // Asumimos que tu backend devuelve { data: { kits: [...] } } siguiendo tu patrón
  return data.data.kits;
};