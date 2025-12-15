import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const Layout = () => {
  const location = useLocation();
  // Detectamos si es la Home para saber si aplicar relleno superior o no
  const isHome = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Navbar fija siempre visible */}
      <Navbar />

      {/* 2. Contenido de la página (Outlet) */}
      {/* Si NO es la Home, añadimos 'pt-32' (padding-top) para que el contenido 
         no quede oculto detrás de la Navbar flotante.
         Si es la Home, lo dejamos en 0 para que el HeroSection cubra la pantalla.
      */}
      <main className={`flex-grow ${!isHome ? "pt-28" : ""}`}>
        <Outlet />
      </main>

      {/* 3. Footer siempre al final */}
      <Footer />
    </div>
  );
};

export default Layout;