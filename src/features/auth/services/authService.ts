import axiosClient from "../../../api/axios.client";
import {
  type RegisterFields,
  type LoginFormFields,
  type ProfileFields,
  type ForgotPasswordFields,
  type ResetPasswordFields,
} from "../validators/authSchema";
import { API_ROUTES } from "../../../config/constants";

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
  const response = await axiosClient.post(`${API_ROUTES.USERS}/login`, data);

  return response.data;
};

//servicio para mostrar el perfil
export const getMyProfileService = async () => {
  const response = await axiosClient.get(`${API_ROUTES.USERS}`);
  return response.data;
};

//servicio para actualizar el perfil REVISADO Y CORREGIDO OLEOLE
export const updateProfileService = async (
  data: ProfileFields,
  file: File | null
) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    const value = data[key as keyof ProfileFields];
    if (value !== undefined && value !== null && key !== "profilePicture") {
      formData.append(key, String(value));
    }
  });

  if (file) {
    formData.append("profilePicture", file);
  }

  const response = await axiosClient.patch(
    `${API_ROUTES.USERS}/update`,
    formData
  );

  return response.data;
};

//servicio para olvidé la contraseña
export const forgotPasswordService = async (data: ForgotPasswordFields) => {
  const response = await axiosClient.post(
    `${API_ROUTES.USERS}/forgotpassword`,
    data
  );
  return response.data;
};

//servicio para restablecer la contraseña
export const resetPasswordService = async (data: ResetPasswordFields) => {
  const response = await axiosClient.post(`${API_ROUTES.USERS}/resetpassword`, {
    email: data.email,
    pin: data.pin,
    password: data.password,
  });
  return response.data;
};
