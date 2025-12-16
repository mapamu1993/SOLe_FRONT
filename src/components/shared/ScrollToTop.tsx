import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Si la URL tiene un hash (ej: #faq), buscamos el elemento y hacemos scroll
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        // Pequeño timeout para asegurar que la página ha cargado
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } else {
      // Si no hay hash, subimos arriba del todo (comportamiento normal)
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]); // Ejecutar cuando cambie la ruta o el hash

  return null;
};

export default ScrollToTop;