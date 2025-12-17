import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  type ForgotPasswordFields,
} from "../validators/authSchema";
import { useForgotPasswordMutation } from "../hooks/usePasswordRecovery";


import ForgotPasswordDesign from "../components/ForgotPasswordDesign";

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
    <ForgotPasswordDesign
      register={register}
      errors={errors}
      isPending={isPending}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default ForgotPasswordPage;
