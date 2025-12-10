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

export type RegisterFields = z.infer<typeof registerSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;
