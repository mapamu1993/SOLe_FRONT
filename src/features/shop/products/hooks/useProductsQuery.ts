import { useQuery } from "@tanstack/react-query";
import { getAllProductsService, getProductByIdService } from "../services/productServices";
import type { Product } from "../types/productTypes";

export const useProductsQuery = () => {
  return useQuery<Product[], Error>({
    queryKey: ["allProducts"],
    queryFn: getAllProductsService,
    staleTime: 1000 * 60 * 5,
  });
};

export const useProductByIdQuery = (id: string) => {
  return useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: () => getProductByIdService(id),
    enabled: !!id, // Solo se ejecuta si hay ID
    retry: false,
  });
};