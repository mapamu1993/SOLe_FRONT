import { useQuery } from "@tanstack/react-query";
import { getAllKitsService } from "../services/kitService";
import { type Product } from "../../products/types/productTypes";

export const useKitsQuery = () => {
  return useQuery<Product[], Error>({
    queryKey: ["kits"],
    queryFn: getAllKitsService,
    staleTime: 1000 * 60 * 5, // 5 minutos de caché
  });
};