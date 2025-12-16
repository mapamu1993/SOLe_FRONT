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
      await queryClient.invalidateQueries({ queryKey: ["allProducts"] });
      navigate("/tienda");
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

  // Añadimos actualizaciones optimistas para que se vea el cambio instantáneo
  return useMutation<Product, AxiosError<ErrorResponse>, UpdateProductParams>({
    mutationFn: updateProductService,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["allProducts"] });
      const previous = queryClient.getQueryData<Product[]>(["allProducts"]);

      if (previous) {
        queryClient.setQueryData<Product[] | undefined>(["allProducts"],
          previous.map((p) =>
            p._id === variables.id ? { ...p, ...(variables.data as any) } : p
          )
        );
      }

      return { previous };
    },
    onError: (err, _variables, context: any) => {
      const errorMessage =
        err.response?.data?.message || "Error al actualizar el producto.";
      enqueueSnackbar(errorMessage, { variant: "error" });

      if (context?.previous) {
        queryClient.setQueryData(["allProducts"], context.previous);
      }
    },
    onSuccess: () => {
      enqueueSnackbar("Producto actualizado correctamente.", {
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
      navigate("/tienda");
    },
  });
};

export const useDeleteProductMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ErrorResponse>, string>({
    mutationFn: deleteProductService,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["allProducts"] });
      const previous = queryClient.getQueryData<Product[]>(["allProducts"]);

      if (previous) {
        queryClient.setQueryData<Product[] | undefined>(["allProducts"],
          previous.filter((p) => p._id !== id)
        );
      }

      return { previous };
    },
    onError: (err, _id, context: any) => {
      const errorMessage =
        err.response?.data?.message || "Error al eliminar el producto.";
      enqueueSnackbar(errorMessage, { variant: "error" });

      if (context?.previous) {
        queryClient.setQueryData(["allProducts"], context.previous);
      }
    },
    onSuccess: () => {
      enqueueSnackbar("Producto eliminado.", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
    },
  });
};