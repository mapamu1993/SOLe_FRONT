// src/utils/imageUtils.ts
import { IMAGE_URL } from "../config/constants";

export const getImageUrl = (path: string | undefined | null): string => {
  if (!path) return "/placeholder.jpg"; // Puedes poner una imagen por defecto aquí
  if (path.startsWith("http")) return path;

  // ESTA ES LA CLAVE: .replace(/\\/g, "/")
  // Convierte las barras invertidas de Windows (\) en barras normales (/)
  // para que el navegador pueda leer la ruta correctamente.
  return `${IMAGE_URL}/${path.replace(/\\/g, "/")}`;
};