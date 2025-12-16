import { Link } from "react-router-dom";
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { useSnackbar } from "notistack"; // <--- 1. IMPORTAR
import { useState } from "react"; // <--- 2. IMPORTAR STATE

export const Footer = () => {
  const { enqueueSnackbar } = useSnackbar(); // <--- 3. HOOK
  const [email, setEmail] = useState(""); // <--- 4. ESTADO PARA EL INPUT

  // Función para manejar la suscripción
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página se recargue

    if (!email.trim()) {
      enqueueSnackbar("Por favor, escribe un email válido", {
        variant: "warning",
      });
      return;
    }

    // Aquí iría la llamada a tu API real, simulamos éxito:
    enqueueSnackbar("¡Suscrito correctamente! Gracias por unirte.", {
      variant: "success",
    });
    setEmail(""); // Limpiamos el campo
  };

  return (
    <footer className="bg-[#333D29] text-[#EBECE2] py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Columna 1: Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-white">
              El Buen Camino
            </h3>
            <p className="text-sm opacity-80 leading-relaxed">
              Tu compañero digital para la experiencia del Camino de Santiago.
              Planifica, descubre y vive la aventura de tu vida.
            </p>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider">
              Explora
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-[#B6AD90] transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-[#B6AD90] transition-colors"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-[#B6AD90] transition-colors"
                >
                  Blog del Peregrino
                </Link>
              </li>
              <li>
                <Link
                  to="/tienda"
                  className="hover:text-[#B6AD90] transition-colors"
                >
                  Tienda Oficial
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Legal */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider">
              Legal
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-[#B6AD90] transition-colors"
                >
                  Privacidad
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-[#B6AD90] transition-colors"
                >
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="hover:text-[#B6AD90] transition-colors"
                >
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-[#B6AD90] transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Newsletter - CON LA NUEVA LÓGICA */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider">
              Newsletter
            </h4>
            <p className="text-sm opacity-80 mb-4">
              Recibe consejos y ofertas exclusivas.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Tu email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#EBECE2]/10 border border-[#EBECE2]/20 rounded px-4 py-2 text-sm w-full focus:outline-none focus:border-[#B6AD90] text-white placeholder-white/50"
              />
              <button
                type="submit"
                className="bg-[#B6AD90] text-[#333D29] px-4 py-2 rounded font-bold hover:bg-[#EBECE2] transition-colors"
              >
                OK
              </button>
            </form>

            <div className="flex gap-4 mt-8">
              <a href="#" className="hover:text-[#B6AD90] transition-colors">
                <IconBrandInstagram size={24} />
              </a>
              <a href="#" className="hover:text-[#B6AD90] transition-colors">
                <IconBrandFacebook size={24} />
              </a>
              <a href="#" className="hover:text-[#B6AD90] transition-colors">
                <IconBrandTwitter size={24} />
              </a>
              <a href="#" className="hover:text-[#B6AD90] transition-colors">
                <IconBrandYoutube size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#EBECE2]/10 mt-16 pt-8 text-center text-sm opacity-60">
          <p>
            &copy; {new Date().getFullYear()} El Buen Camino. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
