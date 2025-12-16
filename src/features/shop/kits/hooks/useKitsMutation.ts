import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteKitService, updateKitService, createKitService } from "../services/kitService";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export const useDeleteKitMutation = () => {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    return useMutation({
        mutationFn: deleteKitService,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['kits'] });
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
        mutationFn: updateKitService,
        onSuccess: async () => {      
            await queryClient.invalidateQueries({ queryKey: ['kits'] });
            await queryClient.invalidateQueries({ queryKey: ['kit'] });
            
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
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['kits'] });
            
            enqueueSnackbar("Kit creado correctamente", { variant: "success" });
            navigate("/kits");
        },
        onError: () => {
            enqueueSnackbar("Error al crear el kit", { variant: "error" });
        }
    });
};