import axiosClient from "../../../api/axios.client";
import {
  type RegisterFields,
  type LoginFormFields,
} from "../../auth/validators/auth.schema";

/**
 * Servicio para registrar un nuevo usuario.
 */
export const registerUserService = async (
  data: RegisterFields,
  file: File | null
) => {
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

  // Realizamos la petición de register
  const response = await axiosClient.post("api/users/register", formData);
  return response.data;
};

// servicio para iniciar sesion
export const loginUserService = async (data: LoginFormFields) => {
  const response = await axiosClient.post("api/users/login", data);

  return response.data;
};
