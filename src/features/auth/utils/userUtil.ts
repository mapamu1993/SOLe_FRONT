import { IMAGE_URL } from "../../../config/constants";

export const getUserProfileUrl = (
  image: string | undefined | null
) => {
  if (!image) return undefined;
  if (image.startsWith("http")) return image;
  return `${IMAGE_URL}/uploads/users/${image}`;
};

export const getUserInitials = (name?: string, username?: string) => {
  if (name && name.length > 0) return name[0].toUpperCase();
  if (username && username.length > 0) return username[0].toUpperCase();
  return "U";
};

export const getDisplayName = (user: any) => {
  return user.name || user.username || "Usuario";
};

export const formatUserRole = (role?: string) => {
  if (!role || role.length === 0) return "N/A";
  return role.charAt(0).toUpperCase() + role.slice(1);
};
