import { useQuery } from "@tanstack/react-query";
import { getAllProductsService } from "../services/productServices";
import type { Product } from "../types/productTypes";

export const useProductsQuery = () => {
  return useQuery<Product[], Error>({
    queryKey: ["allProducts"],
    queryFn: getAllProductsService,
    staleTime: 1000 * 60 * 5,
  });
};
