import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteBlogService,
  editBlogService,
  createBlogService,
} from "../services/blogService";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

interface ErrorResponse {
  message: string;
}

// CAMBIO 1: Modificar useCreateBlogMutation
export const useCreateBlogMutation = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, file }: { data: any; file: File }) =>
      createBlogService(data, file),

    // Agregamos 'async' aquí
    onSuccess: async () => {
      // Agregamos 'await' para esperar a que la caché se limpie antes de seguir
      await queryClient.resetQueries({
        queryKey: ["blogs"],
      });

      enqueueSnackbar("Blog creado exitosamente", { variant: "success" });

      // Ahora navegamos, asegurando que la próxima vista cargará datos nuevos
      navigate("/blog");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const msg = error.response?.data?.message || "Error al crear el blog";
      enqueueSnackbar(msg, { variant: "error" });
    },
  });
};

// Hook para borrar un blog
export const useDeleteBlogMutation = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: deleteBlogService,

    onSuccess: async () => {
      await queryClient.resetQueries({
        queryKey: ["blogs"],
      });
      enqueueSnackbar("Blog eliminado exitosamente", { variant: "success" });
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const msg = error.response?.data?.message || "Error al eliminar el blog";
      enqueueSnackbar(msg, { variant: "error" });
    },
  });
};

// Hook para editar un blog
export const useEditBlogMutation = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    // Recibimos un objeto y pasamos los argumentos desestructurados al servicio
    mutationFn: ({
      id,
      data,
      file,
    }: {
      id: string;
      data: any;
      file: File | null;
    }) => editBlogService(id, data, file),

    onSuccess: async () => {
      await queryClient.resetQueries({
        queryKey: ["blogs"],
      });
      // También invalidamos el detalle del blog específico por si el usuario entra de nuevo
      await queryClient.resetQueries({
        queryKey: ["blog"],
      });

      enqueueSnackbar("Blog editado exitosamente", { variant: "success" });
      navigate("/blog");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const msg = error.response?.data?.message || "Error al editar el blog";
      enqueueSnackbar(msg, { variant: "error" });
    },
  });
};
