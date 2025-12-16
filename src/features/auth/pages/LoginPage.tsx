import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { loginSchema, type LoginFormFields } from "../validators/authSchema";
import { loginUserService } from "../services/authService";
import { LoginDesign } from "../components/LoginDesign"; 

const LoginPage = () => {
  // LÓGICA 
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormFields) => {
    setError("");
    try {
      const response = await loginUserService(data);
      const userData = response.user;
      login(userData);
      
      navigate("/profile", { state: { fromLogin: true } });
      
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Error al iniciar sesión";
      setError(errorMessage);
    }
  };

  // CONEXIÓN CON EL DISEÑO
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