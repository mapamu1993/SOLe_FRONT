//importamos axios para crear una instancia
import axios from "axios";
//declaramos la url base de la api
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

//creamos la instancia de axios con la url base y configuraciones necesarias
const axiosClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  },
});

//interceptor para forzar el logout en caso de recibir un error 401 del backend
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      !window.location.pathname.includes("/login")
    ) {
      window.dispatchEvent(new Event("force-logout"));
    }
    return Promise.reject(error);
  }
);
export default axiosClient;