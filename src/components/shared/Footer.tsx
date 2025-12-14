import React from "react";
import { Link } from "react-router-dom";
import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconMail,
} from "@tabler/icons-react";

const Footer = () => {
  return (
    <footer
      className="
    w-full
    bg-[#333D29]
    text-[#EBECE2]
    px-4
    md:px-6
    py-20 
    pb-10"
    >
      <div
        className="
      max-w-7xl
      mx-auto
      flex 
      flex-col
      justify-between
      min-h-[400px]"
      >
        {/* TOP: LINKS */}
        <div
          className="
        grid
        grid-cols-2
        md:grid-cols-4
        gap-12
        mb-20"
        >
          <div className="space-y-4">
            <h4 className="text-white font-bold mb-6">Explorar</h4>
            <Link to="/" className="block text-[#B6AD90] hover:text-white">
              Home
            </Link>
            <Link to="/kits" className="block text-[#B6AD90] hover:text-white">
              Tienda
            </Link>
            <Link to="/about" className="block text-[#B6AD90] hover:text-white">
              Filosofía
            </Link>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold mb-6">Ayuda</h4>
            <Link
              to="/contacto"
              className="block text-[#B6AD90] hover:text-white"
            >
              Contacto
            </Link>
            <Link to="/faq" className="block text-[#B6AD90] hover:text-white">
              FAQ
            </Link>
          </div>
          <div
            className="
          md:col-span-2
          flex
          flex-col
          items-start
          md:items-end"
          >
            <h4 className="text-white font-bold mb-6">Social</h4>
            <div className="flex gap-4">
              <div
                className="
              p-3
              rounded-full
              border
              border-white/10
              hover:bg-white
              hover:text-[#333D29] 
              transition-all 
              cursor-pointer"
              >
                <IconBrandInstagram size={20} />
              </div>
              <div
                className="
              p-3
              rounded-full
              border
              border-white/10
              hover:bg-white
              hover:text-[#333D29]
              transition-all
              cursor-pointer"
              >
                <IconBrandTwitter size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM: BIG LOGO */}
        <div
          className="
        border-t
        border-white/10
        pt-10
        flex 
        flex-col
        md:flex-row
        justify-between 
        items-end"
        >
          <h1
            className="
          text-[15vw]
          leading-none
          font-bold
          text-[#F0FDF4]/5 
          select-none
          pointer-events-none"
          >
            SOLE
          </h1>
          <div
            className="
          flex 
          gap-8
          text-xs
          text-[#B6AD90]
          uppercase 
          tracking-widest 
          pb-4"
          >
            <span>© 2024 Sole</span>
            <span>Privacidad</span>
            <span>Legal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
