import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { loginSchema, type LoginFormFields } from "../validators/authSchema";
import { loginUserService } from "../services/authService";

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { login } = useAuth();

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
      navigate("/profile");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Error al iniciar sesión";
      setError(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      {/* Mensaje de error general */}
      {error && (
        <div
          style={{
            color: "red",
            marginBottom: "1rem",
            border: "1px solid red",
            padding: "10px",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div>
          <label>Email:</label>
          <input type="email" {...register("email")} />
          {errors.email && (
            <span style={{ color: "red", display: "block" }}>
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Contraseña */}
        <div>
          <label>Contraseña:</label>
          <input type="password" {...register("password")} />
          {errors.password && (
            <span style={{ color: "red", display: "block" }}>
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Botón Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{ marginTop: "10px" }}
        >
          {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>
      </form>

      <p style={{ marginTop: "1rem" }}>
        ¿No tienes cuenta? <RouterLink to="/register">Regístrate</RouterLink>
        <RouterLink to="/forgotpassword">Recuperar contraseña</RouterLink>
      </p>
    </div>
  );
};

export default LoginPage;
