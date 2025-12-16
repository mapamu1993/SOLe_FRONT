import { useQuery } from "@tanstack/react-query";
import { getAllKitsService, getKitByIdService } from "../services/kitService";
import { type Kit } from "../types/kitTypes";

export const useKitsQuery = () => {
  return useQuery<Kit[], Error>({
    queryKey: ["kits"],
    queryFn: getAllKitsService,
    staleTime: 1000 * 60 * 5, // 5 minutos (Confiamos en la actualización manual)
    refetchOnMount: true,
    refetchOnWindowFocus: false, // Evitamos recargas innecesarias al cambiar de ventana
  });
};

export const useKitByIdQuery = (id: string) => {
  return useQuery<Kit, Error>({
    queryKey: ["kit", id],
    queryFn: () => getKitByIdService(id),
    enabled: !!id,
    staleTime: 0, // El detalle sí queremos que sea fresco siempre
  });
};