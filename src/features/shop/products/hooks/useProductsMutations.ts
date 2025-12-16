import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProductService } from "../services/productServices";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { AxiosError } from "axios";
import { 
  updateProductService,
  deleteProductService
} from "../services/productServices";

interface ErrorResponse {
  message: string;
}

export const useCreateProductMutation = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProductService,
    onSuccess: async () => {
      enqueueSnackbar("Producto creado exitosamente.", { variant: "success" });
      await queryClient.resetQueries({ queryKey: ["allProducts"] });
      navigate("/");
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      const errorMessage =
        err.response?.data?.message || "Error al crear el producto.";
      enqueueSnackbar(errorMessage, { variant: "error" });
    },
  });
};

export const useUpdateProductMutation = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data, file }: { id: string; data: any; file: File | null }) =>
      updateProductService(id, data, file),
    onSuccess: () => {
      enqueueSnackbar("Producto actualizado correctamente.", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["allProducts"] }); // Refresca la lista
      queryClient.invalidateQueries({ queryKey: ["product"] });     // Refresca el detalle si estás en él
      navigate("/tienda");
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      const errorMessage = err.response?.data?.message || "Error al actualizar.";
      enqueueSnackbar(errorMessage, { variant: "error" });
    },
  });
};

export const useDeleteProductMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProductService,
    onSuccess: () => {
      enqueueSnackbar("Producto eliminado.", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      const errorMessage = err.response?.data?.message || "Error al eliminar.";
      enqueueSnackbar(errorMessage, { variant: "error" });
    },
  });
};