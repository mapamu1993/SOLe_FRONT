import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteKitService,
  updateKitService,
  createKitService,
  sendKitRequestService,
} from "../services/kitService";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

// Hook para eliminar un kit
export const useDeleteKitMutation = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: deleteKitService,
    onSuccess: async () => {
      await queryClient.resetQueries({ queryKey: ["kits"] });
      enqueueSnackbar("Kit eliminado correctamente", { variant: "success" });
    },
    onError: () => {
      enqueueSnackbar("Error al eliminar el kit", { variant: "error" });
    },
  });
};

// Hook para actualizar un kit existente
export const useUpdateKitsMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateKitService(id, formData),

    onSuccess: async () => {
      await queryClient.resetQueries({ queryKey: ["kits"] });
      await queryClient.resetQueries({ queryKey: ["kit"] });

      enqueueSnackbar("Kit actualizado correctamente", { variant: "success" });
      navigate("/kits");
    },
    onError: () => {
      enqueueSnackbar("Error al actualizar el kit", { variant: "error" });
    },
  });
};

// Hook para crear un nuevo kit
export const useCreateKitMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: createKitService,
    onSuccess: async () => {
      await queryClient.resetQueries({ queryKey: ["kits"] });

      enqueueSnackbar("Kit creado correctamente", { variant: "success" });
      navigate("/kits");
    },
    onError: () => {
      enqueueSnackbar("Error al crear el kit", { variant: "error" });
    },
  });
};

// Hook para enviar una solicitud de kit (solo disponible si el kit es premium)
export const useSendKitRequestMutation = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: sendKitRequestService,
    onSuccess: () => {
      enqueueSnackbar("Solicitud enviada con éxito. Te contactaremos pronto.", {
        variant: "success",
      });
    },
    onError: (error: any) => {
      const msg =
        error.response?.data?.message || "Error al enviar la solicitud";
      enqueueSnackbar(msg, { variant: "error" });
    },
  });
};
