import axiosApi from "../../../api/axios.api";
import {
  type RegisterFields,
  type LoginCredentials,
} from "../../auth/validators/auth.schema";

/**
 * Servicio para registrar un nuevo usuario.
 */
export const registerUser = async (data: RegisterFields, file: File | null) => {
  const formData = new FormData();

  // Agregamos los campos de texto
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("username", data.username);
  formData.append("lastName", data.lastName);

  // Agregamos la imagen si existe
  if (file) {
    formData.append("image", file);
  }

  // Realizamos la petición
  const response = await axiosApi.post("api/users/register", formData);
  return response.data;
};

// servicio para iniciar sesion
export const loginUser = async (credentials: LoginCredentials) => {
  const response = await axiosApi.post("api/users/login", credentials);

  return response.data;
};
