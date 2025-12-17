import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { changePasswordService } from "../services/authService";
import { useSnackbar } from "notistack";

type ChangePasswordVariables = {
  current: string;
  newPass: string;
};

export const useChangePasswordMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ current, newPass }: ChangePasswordVariables) =>
      changePasswordService(current, newPass),
    onSuccess: () => {
      enqueueSnackbar("Contraseña cambiada con éxito", { variant: "success" });
      navigate("/profile");
    },
    onError: (error: any) => {
      const msg =
        error.response?.data?.message || "Error al cambiar la contraseña";
      enqueueSnackbar(msg, { variant: "error" });
    },
  });
};
