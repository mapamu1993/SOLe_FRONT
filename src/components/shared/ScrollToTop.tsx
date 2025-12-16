import { useEffect } from "react";
import { useLocation } from "react-router-dom";


//SIRVE PARA QUE CUANDO CAMBIA DE RUTA, EL SCROLL VAYA AL TOP O AL ELEMENTO CON EL ID DEL HASH
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } else {
      
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;