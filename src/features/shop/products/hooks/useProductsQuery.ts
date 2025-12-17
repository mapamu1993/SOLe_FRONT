import { useQuery } from "@tanstack/react-query";
import { getAllProductsService, getProductByIdService } from "../services/productServices";
import type { Product } from "../types/productTypes";

// Hook para obtener todos los productos
export const useProductsQuery = () => {
  return useQuery<Product[], Error>({
    queryKey: ["allProducts"],
    queryFn: getAllProductsService,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};

// Hook para obtener un producto concreto por ID
export const useProductByIdQuery = (id: string) => {
  return useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: () => getProductByIdService(id),
    enabled: !!id,
    retry: false,
  });
};