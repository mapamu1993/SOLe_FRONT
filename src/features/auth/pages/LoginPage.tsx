import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AxiosError } from "axios"; // Importante para tipar el error

import { loginSchema, type LoginCredentials } from "../validators/auth.schema";
import { loginUser } from "../services/authService";

const LoginPage = () => {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (credentials: LoginCredentials) => {
    setServerError("");

    try {
      // 1. Hacemos la petición
      const responseData = await loginUser(credentials);

      // 2. GUARDAR EL TOKEN (Paso crucial faltante)
      // Ajusta 'token' según cómo lo devuelva tu backend (ej: responseData.access_token)
      if (responseData.token) {
        localStorage.setItem("token", responseData.token);
        // Opcional: guardar usuario
        // localStorage.setItem("user", JSON.stringify(responseData.user));
      }

      // 3. Redirigir
      navigate("/home");
    } catch (error) {
      console.error("Error en login:", error);

      // 4. Manejo de errores específico
      if (error instanceof AxiosError && error.response) {
        // Si el backend devuelve un 401 (No autorizado) o 400
        if (error.response.status === 401 || error.response.status === 400) {
          setServerError("Email o contraseña incorrectos.");
        } else {
          // Otro error del servidor (500, etc)
          setServerError(
            error.response.data?.message || "Error en el servidor."
          );
        }
      } else {
        // Error de conexión (internet caído, api apagada)
        setServerError("No se pudo conectar con el servidor.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      {/* Mensaje de error general */}
      {serverError && (
        <div
          style={{
            color: "red",
            marginBottom: "1rem",
            border: "1px solid red",
            padding: "10px",
          }}
        >
          {serverError}
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
      </p>
    </div>
  );
};

export default LoginPage;
