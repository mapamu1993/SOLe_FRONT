import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createProductService,
  updateProductService,
  deleteProductService,
  type CreateProductParams, // Importamos los tipos exportados
  type UpdateProductParams
} from "../services/productServices";
import { type Product } from "../types/productTypes"; // Asegúrate de importar Product
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { AxiosError } from "axios";

export interface ErrorResponse {
  message: string;
}

export const useCreateProductMutation = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  // Tipado explícito: <RespuestaExito, Error, VariablesEntrada>
  return useMutation<Product, AxiosError<ErrorResponse>, CreateProductParams>({
    mutationFn: createProductService,
    onSuccess: async () => {
      enqueueSnackbar("Producto creado exitosamente.", { variant: "success" });
      await queryClient.resetQueries({ queryKey: ["allProducts"] });
      navigate("/");
    },
    onError: (err) => {
      const errorMessage =
        err.response?.data?.message || "Error al crear el producto.";
      enqueueSnackbar(errorMessage, { variant: "error" });
    },
  });
};

export const useEditProductMutation = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  // Tipado explícito aquí para arreglar tus errores en EditPage
  return useMutation<Product, AxiosError<ErrorResponse>, UpdateProductParams>({
    mutationFn: updateProductService,
    onSuccess: () => {
      enqueueSnackbar("Producto actualizado correctamente.", {
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
      navigate("/tienda");
    },
    onError: (err) => {
      const errorMessage =
        err.response?.data?.message || "Error al actualizar el producto.";
      enqueueSnackbar(errorMessage, { variant: "error" });
    },
  });
};

export const useDeleteProductMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ErrorResponse>, string>({
    mutationFn: deleteProductService,
    onSuccess: () => {
      enqueueSnackbar("Producto eliminado.", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
    },
    onError: (err) => {
      const errorMessage =
        err.response?.data?.message || "Error al eliminar el producto.";
      enqueueSnackbar(errorMessage, { variant: "error" });
    },
  });
};