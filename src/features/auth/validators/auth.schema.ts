import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  lastName: z.string().min(3, "El apellido debe tener al menos 3 caracteres"),
  email: z.string().email("Debe ser un email válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  profilePicture: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Debe ser un email válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const profileSchema = z.object({
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  lastName: z.string().min(3, "El apellido debe tener al menos 3 caracteres"),
  profilePicture: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Debe ser un email válido"),
});

export const resetPasswordSchema = z
  .object({
    email: z.string().email("Debe ser un email válido"),
    pin: z.string().min(4, "El pin debe tener al menos 4 caracteres"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type RegisterFields = z.infer<typeof registerSchema>;
export type LoginFormFields = z.infer<typeof loginSchema>;
export type ProfileFields = z.infer<typeof profileSchema>;
export type ForgotPasswordFields = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFields = z.infer<typeof resetPasswordSchema>;
