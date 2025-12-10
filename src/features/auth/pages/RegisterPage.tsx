import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

// Importamos el esquema y el tipo
import {
  registerSchema,
  type RegisterFields,
} from "../../auth/validators/auth.schema";

// Importamos el servicio que acabamos de crear
// (Asegúrate de ajustar la ruta según dónde guardes el archivo service)
import { registerUser } from "../../auth/services/authService";

const RegisterPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFields>({
    resolver: zodResolver(registerSchema),
  });

  // Manejo del input tipo File y su previsualización
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setPreviewUrl(null);
    }
  };

  // Función de envío del formulario
  const onSubmit = async (data: RegisterFields) => {
    setServerError("");
    try {
      // Delegamos la lógica de la petición al servicio
      await registerUser(data, file);

      // Si todo sale bien, redirigimos
      navigate("/login");
    } catch (error) {
      console.error("Error en petición:", error);
      // Aquí podrías mejorar el manejo de errores si tu backend devuelve un mensaje específico
      setServerError("Ocurrió un error, inténtalo de nuevo.");
    }
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>

      {serverError && <p style={{ color: "red" }}>{serverError}</p>}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Nombre */}
        <div>
          <label>Nombre:</label>
          <input type="text" {...register("name")} />
          {errors.name && (
            <span style={{ color: "red" }}>{errors.name.message}</span>
          )}
        </div>

        {/* Apellido */}
        <div>
          <label>Apellido:</label>
          <input type="text" {...register("lastName")} />
          {errors.lastName && (
            <span style={{ color: "red" }}>{errors.lastName.message}</span>
          )}
        </div>

        {/* Usuario */}
        <div>
          <label>Usuario:</label>
          <input type="text" {...register("username")} />
          {errors.username && (
            <span style={{ color: "red" }}>{errors.username.message}</span>
          )}
        </div>

        {/* Email */}
        <div>
          <label>Email:</label>
          <input type="email" {...register("email")} />
          {errors.email && (
            <span style={{ color: "red" }}>{errors.email.message}</span>
          )}
        </div>

        {/* Contraseña */}
        <div>
          <label>Contraseña:</label>
          <input type="password" {...register("password")} />
          {errors.password && (
            <span style={{ color: "red" }}>{errors.password.message}</span>
          )}
        </div>

        {/* Imagen de perfil */}
        <div>
          <label>Imagen de perfil:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Vista previa"
              style={{ marginTop: "10px", maxWidth: "100px", display: "block" }}
            />
          )}
        </div>

        {/* Botón Submit */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registrando..." : "Registrarse"}
        </button>
      </form>

      <p>
        ¿Ya tienes cuenta? <RouterLink to="/login">Inicia sesión</RouterLink>
      </p>
    </div>
  );
};

export default RegisterPage;
