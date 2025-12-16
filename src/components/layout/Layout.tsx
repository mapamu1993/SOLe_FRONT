// Importa componentes de 'react-router-dom': Outlet para el contenido anidado y useLocation para saber la ruta actual
import { Outlet, useLocation } from "react-router-dom";
// Importa el componente de barra de navegación compartida
import Navbar from "../shared/Navbar";
// Importa el componente de pie de página compartido
import Footer from "../shared/Footer";
// Importa el componente para las notificaciones (Toasts)
import { Toaster } from "sonner";

// Define el componente funcional Layout que servirá de estructura base para todas las páginas
const Layout = () => {
  // Obtiene el objeto location que contiene información sobre la URL actual
  const location = useLocation();
  // Determina si la página actual es la 'Home' (ruta raíz) para aplicar estilos condicionales
  const isHome = location.pathname === "/";

  // Retorna la estructura JSX que compone la interfaz
  return (
    // Contenedor principal flex que asegura ocupar al menos toda la altura de la pantalla
    // AÑADIDO: bg-[#EBECE2] para mantener el color de fondo base en toda la app
    <div className="flex flex-col min-h-screen bg-[#EBECE2]">
      
      {/* CONFIGURACIÓN DE LOS TOASTS (Añadido aquí para que funcione) */}
      <Toaster 
        position="top-center" 
        richColors 
        toastOptions={{
          style: {
            background: '#F5F5F0',
            border: '1px solid #B6AD90',
            color: '#333D29',
            fontFamily: 'serif' // Para que pegue con tu marca
          },
        }}
      />

      {/* Renderiza la barra de navegación en la parte superior */}
      <Navbar />
      
      {/* Contenedor principal del contenido; añade padding superior (pt-28) si no es la home para compensar el navbar fijo */}
      <main className={`flex-grow ${!isHome ? "pt-28" : ""}`}>
        {/* Renderiza el componente hijo correspondiente a la ruta activa en ese momento */}
        <Outlet />
      </main>
      
      {/* Renderiza el pie de página al final del contenedor */}
      <Footer />
    </div>
  );
};

// Exporta el componente Layout por defecto para ser utilizado en el enrutador
export default Layout;