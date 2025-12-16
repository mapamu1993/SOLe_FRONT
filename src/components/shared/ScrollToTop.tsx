import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  // Obtenemos la ruta actual (ej: "/tienda", "/about")
  const { pathname } = useLocation();

  useEffect(() => {
    // Cada vez que 'pathname' cambie, subimos el scroll a 0,0 inmediatamente
    window.scrollTo(0, 0);
  }, [pathname]);

  // No renderiza nada visualmente
  return null;
};

export default ScrollToTop;