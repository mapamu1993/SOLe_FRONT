// Importa la librería axios para realizar peticiones HTTP
import axios from "axios";

// Define la URL base obteniéndola de las variables de entorno o usando localhost por defecto
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Crea una instancia personalizada de cliente de axios con configuración específica
const axiosClient = axios.create({
  // Asigna la URL base definida anteriormente para todas las peticiones de esta instancia
  baseURL: BASE_URL,
  // Habilita el envío de cookies/credenciales en las solicitudes entre dominios (CORS)
  withCredentials: true,
});

// Configura un interceptor para procesar todas las respuestas recibidas antes de que lleguen al código que hizo la petición
axiosClient.interceptors.response.use(
  // Callback de éxito: si la respuesta es correcta, la devuelve tal cual sin cambios
  (response) => response,
  // Callback de error: se ejecuta si la respuesta del servidor indica un fallo
  (error) => {
    // Comienza una condición para verificar errores específicos de autenticación
    if (
      // Verifica si el código de estado de la respuesta es 401 (No autorizado)
      error.response?.status === 401 &&
      // Y asegura que el usuario no se encuentre ya en la página de login para evitar bucles
      !window.location.pathname.includes("/login")
    ) {
      // Dispara un evento personalizado en la ventana para forzar el cierre de sesión en toda la app
      window.dispatchEvent(new Event("force-logout"));
    }
    // Rechaza la promesa devolviendo el error para que pueda ser capturado por un catch posterior
    return Promise.reject(error);
  }
);
// Exporta la instancia configurada para que pueda ser utilizada en otros archivos del proyecto
export default axiosClient;