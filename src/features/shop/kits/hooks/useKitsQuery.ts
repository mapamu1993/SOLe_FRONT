import { useQuery } from "@tanstack/react-query";
import { getAllKitsService, getKitByIdService } from "../services/kitService";
import { type Kit } from "../types/kitTypes";

export const useKitsQuery = () => {
  return useQuery<Kit[], Error>({
    queryKey: ["kits"],
    queryFn: getAllKitsService,
    staleTime: 0, 
    refetchOnMount: true, 
    refetchOnWindowFocus: true,
  });
};

export const useKitByIdQuery = (id: string) => {
  return useQuery<Kit, Error>({
    queryKey: ["kit", id],
    queryFn: () => getKitByIdService(id),
    enabled: !!id,
    staleTime: 0,
  });
};