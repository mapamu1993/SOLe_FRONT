import { IMAGE_URL } from "../config/constants";


// Función para obtener la URL completa de una imagen
export const getImageUrl = (path: string | undefined | null): string => {
  if (!path) return "/placeholder.jpg"; // Puedes poner una imagen por defecto aquí
  if (path.startsWith("http")) return path;

  //CUIDADO CON EL P*** WINDOWS
  // hay que convertir las barras invertidas de Windows (\) en barras normales (/)
  // para que el navegador pueda leer la ruta correctamente
  return `${IMAGE_URL}/${path.replace(/\\/g, "/")}`;
};

// Función para obtener la URL del perfil de usuario
export const getUserProfileUrl = (
  image: string | undefined | null
) => {
  if (!image) return undefined;
  if (image.startsWith("http")) return image;
  return `${IMAGE_URL}/uploads/users/${image}`;
};

// Función para obtener las iniciales del usuario
export const getUserInitials = (name?: string, username?: string) => {
  if (name && name.length > 0) return name[0].toUpperCase();
  if (username && username.length > 0) return username[0].toUpperCase();
  return "U";
};

// Función para obtener el nombre para mostrar del usuario
export const getDisplayName = (user: any) => {
  return user.name || user.username || "Usuario";
};

// Función para formatear el rol del usuario
export const formatUserRole = (role?: string) => {
  if (!role || role.length === 0) return "N/A";
  return role.charAt(0).toUpperCase() + role.slice(1);
};