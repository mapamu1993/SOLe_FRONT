import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(5, "El tìtulo debe contener al menos 5 caracteres."),
  content: z.string().min(30, "El contenido debe tener al menos 30 caracteres"),
<<<<<<< HEAD
  image: z.any().optional(),
=======
  imageage: z.any().optional(),
>>>>>>> main
});

export type CreateBlogFields = z.infer<typeof createBlogSchema>;
