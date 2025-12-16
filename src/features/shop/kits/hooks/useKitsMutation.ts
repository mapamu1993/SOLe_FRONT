import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteKitService, updateKitService, createKitService } from "../services/kitService";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export const useDeleteKitMutation = () => {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    return useMutation({
        mutationFn: deleteKitService,
        onSuccess: () => {
            // No usamos await para que la UI responda rápido
            queryClient.invalidateQueries({ queryKey: ['kits'] });
            enqueueSnackbar("Kit eliminado correctamente", { variant: "success" });
        },
        onError: () => {
            enqueueSnackbar("Error al eliminar el kit", { variant: "error" });
        }
    });
};

export const useUpdateKitsMutation = () => {   
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    return useMutation({
        // CORRECCIÓN IMPORTANTE: Desestructuramos el objeto para pasarlo correctamente al servicio
        mutationFn: ({ id, formData }: { id: string; formData: FormData }) => 
            updateKitService({id, formData}),
            
        onSuccess: () => {      
            // Quitamos el await. Marcamos los datos como "viejos" y navegamos inmediatamente.
            // React Query recargará los datos en segundo plano al llegar a la página de lista.
            queryClient.invalidateQueries({ queryKey: ['kits'] });
            queryClient.invalidateQueries({ queryKey: ['kit'] });
            
            enqueueSnackbar("Kit actualizado correctamente", { variant: "success" });
            navigate("/kits"); 
        },
        onError: () => {
            enqueueSnackbar("Error al actualizar el kit", { variant: "error" });
        }
    });         
};

export const useCreateKitMutation = () => {   
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    return useMutation({
        mutationFn: createKitService,
        onSuccess: () => {
            // Quitamos el await
            queryClient.invalidateQueries({ queryKey: ['kits'] });
            
            enqueueSnackbar("Kit creado correctamente", { variant: "success" });
            navigate("/kits");
        },
        onError: () => {
            enqueueSnackbar("Error al crear el kit", { variant: "error" });
        }
    });
};