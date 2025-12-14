import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteBlogService,
  editBlogService,
  createBlogService,
} from "../services/blogService";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

//para que el server devuelva el error en forma de mensaje
interface ErrorResponse {
  message: string;
}

//este es el hook para crear una entrada de blog
export const useCreateBlogMutation = () => {
  //declaramos las funciones que vamos a usar:
  // para movernos entre paginas
  const navigate = useNavigate();
  // para las alertas de error/success
  const { enqueueSnackbar } = useSnackbar();
  // para manipular el caché de una consulta específica: cuando le damos a crear blog te deja ahi, no cierra la sesion de la pagina
  const queryClient = useQueryClient();

  //usamos el hook useMutation con las variables creadas
  return useMutation({
    //recibe un objeto con info y archivo
    mutationFn: ({ data, file }: { data: any; file: File }) =>
      //envia la info y el archivo al servicio
      createBlogService(data, file),
    //si sale bien:
    onSuccess: () => {
      //se refresca la lista de blogs
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
      //sale una alerta de exito
      enqueueSnackbar("Blog creado exitosamente", { variant: "success" });
      //vuelve a la pagina de blogs
      navigate("/blog");
    },
    //si sale mal: SÓLO EN ESE CASO SE EJECUTA
    onError: (error: AxiosError<ErrorResponse>) => {
      //nos contesta con un error con estructura previamente fabricada de axiosError
      // los ? sirven para que si no hay error, no se ejecute. son para ahorrarnos los if
      const msg = error.response?.data?.message || "Error al crear el blog";
      //sale la alerta con el error
      enqueueSnackbar(msg, { variant: "error" });
    },
  });
};

//hook para borrar un blog
export const useDeleteBlogMutation = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: deleteBlogService,
    onSuccess: () => {
      queryClient.invalidateQueries({
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

//hook para editar un blog
export const useEditBlogMutation = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
      file,
    }: {
      id: string;
      data: any;
      file: File | null;
    }) => editBlogService(id, data, file),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
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
