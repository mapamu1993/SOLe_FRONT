import { useQuery } from "@tanstack/react-query";
import { getMyOrdersService } from "../services/orderServices";
import type { Order } from "../types/orderTypes";

export const useMyOrdersQuery = () => {
  return useQuery<Order[], Error>({
    queryKey: ["myOrders"],
    queryFn: getMyOrdersService,
    staleTime: 1000 * 60 * 2,
  });
};
