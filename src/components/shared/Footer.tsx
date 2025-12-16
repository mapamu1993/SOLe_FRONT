import React from "react";
import { Link } from "react-router-dom";
import { 
  IconBrandInstagram, 
  IconBrandFacebook, 
  IconBrandX, 
  IconMountain 
} from "@tabler/icons-react";
import { BRAND_THEME } from "../../config/designSystem";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-[#333D29] text-[#EBECE2] pt-20 pb-10 font-sans mt-auto`}>
      <div className={BRAND_THEME.layout.maxWidth + " px-6"}>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-[#EBECE2]/10 pb-12 mb-12">
          
          {/* COLUMNA 1: MARCA */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <IconMountain size={32} className="text-[#B6AD90] group-hover:text-white transition-colors" stroke={1.5} />
              <span className="text-2xl font-bold tracking-tight">Sole</span>
            </Link>
            <p className="text-[#EBECE2]/60 text-sm leading-relaxed mb-6">
              Equipamiento técnico diseñado para el Camino de Santiago. 
              Nacidos en Galicia, inspirados por cada paso.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#EBECE2]/5 flex items-center justify-center hover:bg-[#582F0E] transition-colors text-[#B6AD90] hover:text-white">
                <IconBrandInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#EBECE2]/5 flex items-center justify-center hover:bg-[#582F0E] transition-colors text-[#B6AD90] hover:text-white">
                <IconBrandFacebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#EBECE2]/5 flex items-center justify-center hover:bg-[#582F0E] transition-colors text-[#B6AD90] hover:text-white">
                <IconBrandX size={18} />
              </a>
            </div>
          </div>

          {/* COLUMNA 2: EXPLORAR */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-6 text-[#B6AD90]">Explorar</h4>
            <ul className="space-y-4 text-sm text-[#EBECE2]/70">
              <li><Link to="/tienda" className="hover:text-white transition-colors">Tienda Oficial</Link></li>
              <li><Link to="/kits" className="hover:text-white transition-colors">Kits del Peregrino</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Diario (Blog)</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Nuestra Historia</Link></li>
            </ul>
          </div>

          {/* COLUMNA 3: SOPORTE (Aquí está el link al FAQ) */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-6 text-[#B6AD90]">Soporte</h4>
            <ul className="space-y-4 text-sm text-[#EBECE2]/70">
              {/* ENLACE CLAVE AL FAQ */}
              <li><Link to="/about#faq" className="hover:text-white transition-colors">Preguntas Frecuentes (FAQ)</Link></li>
              <li><Link to="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
              <li><Link to="/profile" className="hover:text-white transition-colors">Mi Cuenta</Link></li>
              <li><Link to="/orders" className="hover:text-white transition-colors">Seguimiento de Pedido</Link></li>
            </ul>
          </div>

          {/* COLUMNA 4: NEWSLETTER */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-6 text-[#B6AD90]">Únete al Camino</h4>
            <p className="text-xs text-[#EBECE2]/50 mb-4">
              Recibe consejos y ofertas exclusivas antes de empezar tu ruta.
            </p>
            <form className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="tu@email.com" 
                className="bg-[#EBECE2]/5 border border-[#EBECE2]/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#B6AD90] transition-colors placeholder:text-[#EBECE2]/20"
              />
              <button className="bg-[#582F0E] hover:bg-[#7F4F24] text-white font-bold uppercase text-xs tracking-widest py-3 rounded-lg transition-colors shadow-lg">
                Suscribirme
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-[#EBECE2]/30">
          <p>© {currentYear} Sole. Todos los derechos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#EBECE2] transition-colors">Privacidad</a>
            <a href="#" className="hover:text-[#EBECE2] transition-colors">Términos</a>
            <a href="#" className="hover:text-[#EBECE2] transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;