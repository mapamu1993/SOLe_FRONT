import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
  resetPasswordSchema,
  type ResetPasswordFields,
} from "../validators/authSchema";
import { useResetPasswordMutation } from "../hooks/usePasswordRecovery";

import ResetPasswordDesign from "../components/ResetPasswordDesign";

const ResetPasswordPage = () => {
  const { mutate, isPending } = useResetPasswordMutation();
  const location = useLocation();
  const navigate = useNavigate();

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
        navigate("/login");
      },
    });
  };

  const handleCancel = () => {
    navigate(-1);
  };

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
