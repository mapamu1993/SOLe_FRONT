import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  IconMail, 
  IconBrandWhatsapp, 
  IconBrandInstagram, 
  IconBrandFacebook, 
  IconBrandX, 
  IconArrowLeft 
} from "@tabler/icons-react";

export const ContactDesign = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#EBECE2] p-4 pt-24 md:pt-32 font-sans">
      
      {/* ANIMACIÓN DE ENTRADA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-full max-w-3xl"
      >
        {/* TARJETA PRINCIPAL */}
        <div className="rounded-[2.5rem] bg-white p-8 md:p-12 shadow-2xl border border-[#333D29]/5 text-center relative overflow-hidden">
          
          {/* Decoración de fondo sutil */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#B6AD90] opacity-10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />

          {/* Cabecera */}
          <div className="mb-12 relative z-10">
            <h2 className="text-3xl font-bold text-[#333D29] md:text-5xl font-serif tracking-tight">
              Conecta con <span className="italic text-[#582F0E]">Nosotros</span>
            </h2>
            <p className="mt-4 text-[#656D4A] text-lg font-medium">
              Estamos aquí para escucharte. Elige tu canal preferido.
            </p>
          </div>

          {/* GRID DE CONTACTO PRINCIPAL */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-12 relative z-10">
            {/* EMAIL */}
            <a
              href="mailto:info@elcamino.com"
              className="group flex flex-col items-center justify-center rounded-[2rem] border border-[#A4AC86]/30 bg-[#Fdfcf5] p-8 transition-all hover:border-[#582F0E] hover:shadow-lg hover:-translate-y-1"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#EBECE2] text-[#582F0E] transition-colors group-hover:bg-[#582F0E] group-hover:text-white">
                <IconMail size={32} stroke={1.5} />
              </div>
              <h3 className="font-bold text-[#333D29] text-xl mb-1">Correo Electrónico</h3>
              <p className="text-sm text-[#656D4A] font-medium">info@elcamino.com</p>
            </a>

            {/* WHATSAPP */}
            <a
              href="https://wa.me/34600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center rounded-[2rem] border border-[#A4AC86]/30 bg-[#Fdfcf5] p-8 transition-all hover:border-[#582F0E] hover:shadow-lg hover:-translate-y-1"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#EBECE2] text-[#582F0E] transition-colors group-hover:bg-[#582F0E] group-hover:text-white">
                <IconBrandWhatsapp size={32} stroke={1.5} />
              </div>
              <h3 className="font-bold text-[#333D29] text-xl mb-1">WhatsApp</h3>
              <p className="text-sm text-[#656D4A] font-medium">+34 600 000 000</p>
            </a>
          </div>

          {/* REDES SOCIALES */}
          <div className="border-t border-[#EBECE2] pt-10 relative z-10">
            <h3 className="mb-8 font-bold text-[#333D29] uppercase tracking-widest text-xs">Síguenos en Redes</h3>
            <div className="flex justify-center gap-6 items-center">
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="transform text-[#656D4A] transition-all hover:scale-110 hover:text-[#582F0E] bg-[#F5F5F0] p-4 rounded-full hover:bg-[#EBECE2]"
              >
                <IconBrandInstagram size={28} stroke={1.5} />
              </a>

              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="transform text-[#656D4A] transition-all hover:scale-110 hover:text-[#582F0E] bg-[#F5F5F0] p-4 rounded-full hover:bg-[#EBECE2]"
              >
                <IconBrandFacebook size={28} stroke={1.5} />
              </a>

              {/* X */}
              <a
                href="#"
                aria-label="X (Twitter)"
                className="transform text-[#656D4A] transition-all hover:scale-110 hover:text-[#582F0E] bg-[#F5F5F0] p-4 rounded-full hover:bg-[#EBECE2]"
              >
                <IconBrandX size={28} stroke={1.5} />
              </a>
            </div>
          </div>

          {/* BOTÓN VOLVER */}
          <div className="mt-12 relative z-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#7F4F24] hover:text-[#582F0E] transition-colors group"
            >
              <IconArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Volver al inicio
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};