import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { loginSchema, type LoginFormFields } from "../validators/authSchema";
import { loginUserService } from "../services/authService";
import { LoginDesign } from "../components/LoginDesign";
import { useSnackbar } from "notistack";

const LoginPage = () => {
  const [error, setError] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  const onSubmit = async (data: LoginFormFields) => {
    setError("");
    try {
      const response = await loginUserService(data);
      const userData = response.user;

      login(userData);

      enqueueSnackbar(`¡Bienvenido de nuevo, ${userData.name || "viajero"}!`, {
        variant: "success",
      });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Error al iniciar sesión";
      setError(errorMessage);
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  return (
    <LoginDesign
      register={register}
      errors={errors}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
      serverError={error}
    />
  );
};

export default LoginPage;
