import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "react-router-dom";
import {
  resetPasswordSchema,
  type ResetPasswordFields,
} from "../validators/authSchema";
import { useResetPasswordMutation } from "../hooks/usePasswordRecovery";
import { useForm } from "react-hook-form";

const ResetPasswordPage = () => {
  const { mutate, isPending } = useResetPasswordMutation();
  const location = useLocation();
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
    mutate(data);
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          {...register("email")}
          {...(errors.email && <p>{errors.email.message}</p>)}
        />
        <input
          type="text"
          {...register("pin")}
          {...(errors.pin && <p>{errors.pin.message}</p>)}
        />
        <input
          type="password"
          {...register("password")}
          {...(errors.password && <p>{errors.password.message}</p>)}
        />
        <input
          type="password"
          {...register("confirmPassword")}
          {...(errors.confirmPassword && (
            <p>{errors.confirmPassword.message}</p>
          ))}
        />
        <button type="submit" disabled={isPending}>
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
