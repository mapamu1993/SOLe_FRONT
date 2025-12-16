import { useMutation, useQueryClient } from "@tanstack/react-query";
import {deleteKitService, updateKitService, createKitService} from "../services/kitService";

export const useDeleteKitMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteKitService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['kits']});
    },
    });
};

export const useUpdateKitsMutation = () => {   
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateKitService,
        onSuccess: () => {      
            queryClient.invalidateQueries({ queryKey: ['kits']});
        },
    });         
};

export const usecreateKitMutation = () => {   
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createKitService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['kits']});
        },
    });
};