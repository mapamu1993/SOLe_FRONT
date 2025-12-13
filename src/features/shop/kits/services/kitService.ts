import axiosClient from "../../../../api/axios.client";
import { API_ROUTES } from "../../../../config/constants";
import { type Product } from "../../products/types/productTypes";

export const getAllKitsService = async (): Promise<Product[]> => {
  const { data } = await axiosClient.get(API_ROUTES.KITS);
  return data.data.kits;
};
