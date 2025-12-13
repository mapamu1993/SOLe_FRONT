import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// Imports de tu lógica
import {
  resetPasswordSchema,
  type ResetPasswordFields,
} from "../validators/authSchema";
import { useResetPasswordMutation } from "../hooks/usePasswordRecovery";

// IMPORTE DEL DISEÑO (Asegúrate de que la ruta es correcta)
// Subimos niveles: features -> auth -> pages -> src -> components
import ResetPasswordDesign from "../components/ResetPasswordDesign";

const ResetPasswordPage = () => {
  const { mutate, isPending } = useResetPasswordMutation();
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Recogemos el email que nos manda UpdateProfilePage
  const emailFromState = location.state?.email || "";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ResetPasswordFields>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: emailFromState,
      pin: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (emailFromState) {
      setValue("email", emailFromState);
    }
  }, [emailFromState, setValue]);

  const onSubmit = (data: ResetPasswordFields) => {
    mutate(data, {
      onSuccess: () => {
        // Si todo sale bien, volvemos al login para que entre con la nueva pass
        navigate("/login");
      },
    });
  };

  // 2. ESTA ES LA FUNCIÓN PARA VOLVER ATRÁS
  const handleCancel = () => {
    navigate("/profile/edit"); // Volvemos a la edición del perfil
  };

  // 3. Renderizamos el diseño bonito
  return (
    <ResetPasswordDesign
      register={register}
      errors={errors}
      isPending={isPending}
      onSubmit={handleSubmit(onSubmit)}
      onCancel={handleCancel}
    />
  );
};

export default ResetPasswordPage;
