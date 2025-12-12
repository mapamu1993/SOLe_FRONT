import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink } from "react-router-dom"; // 1. Importar useNavigate
import {
  forgotPasswordSchema,
  type ForgotPasswordFields,
} from "../validators/authSchema";
import { useForgotPasswordMutation } from "../hooks/usePasswordRecovery";

const ForgotPasswordPage = () => {
  const { mutate, isPending } = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFields>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFields) => {
    mutate(data);
  };

  return (
    <div>
      <h2>Recuperar contraseña</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <input type="email" {...register("email")} />
          {errors.email && (
            <span style={{ color: "red", display: "block" }}>
              {errors.email.message}
            </span>
          )}
        </div>

        <button type="submit" disabled={isPending}>
          {isPending ? "Enviando..." : "Enviar enlace de recuperación"}
        </button>
        <p style={{ marginTop: "1rem" }}>
          <RouterLink to="/login">Volver a Iniciar sesión</RouterLink>
        </p>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
