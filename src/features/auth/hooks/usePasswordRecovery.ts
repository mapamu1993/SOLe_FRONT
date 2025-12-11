import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import {
  resetPasswordService,
  forgotPasswordService,
} from "../services/authService";
import type {
  ResetPasswordFields,
  ForgotPasswordFields,
} from "../validators/auth.schema";
import { useSnackbar } from "notistack";

interface ErrorResponse {
  message: string;
}

export const useForgotPasswordMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: ForgotPasswordFields) => forgotPasswordService(data),
    onSuccess: (_, variables) => {
      enqueueSnackbar("Se envio un correo con el enlace de recuperacion", {
        variant: "success",
      });
      navigate("/resetpassword", { state: { email: variables.email } });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const msg =
        error.response?.data?.message || "Error al recuperar la contraseña";
      enqueueSnackbar(msg, { variant: "error" });
    },
  });
};

export const useResetPasswordMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: ResetPasswordFields) => resetPasswordService(data),
    onSuccess: () => {
      enqueueSnackbar("Se restablecio la contraseña", { variant: "success" });
      navigate("/login");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const msg =
        error.response?.data?.message || "Error al restablecer la contraseña";
      enqueueSnackbar(msg, { variant: "error" });
    },
  });
};
