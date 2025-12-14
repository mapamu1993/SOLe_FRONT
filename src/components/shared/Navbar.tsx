import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IconUser, IconMenu2, IconX, IconShoppingBag, IconTrash } from "@tabler/icons-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); 
  const location = useLocation();

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Clases dinámicas para la CÁPSULA FLOTANTE
  const navClasses = `
    fixed left-1/2 -translate-x-1/2 z-[999] transition-all duration-300 ease-in-out
    flex items-center justify-between
    border border-white/10 backdrop-blur-md
    ${
      scrolled
        ? "top-4 w-[90%] max-w-5xl rounded-full bg-[#333D29]/90 py-3 px-6 shadow-2xl" 
        : "top-6 w-[95%] max-w-6xl rounded-full bg-black/20 py-4 px-8" 
    }
  `;

  // Links de navegación (AÑADIDO "CONTACTANOS")
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Nosotros", path: "/about" },
    { name: "Tienda", path: "/tienda" },
    { name: "Kits", path: "/kits" },
    { name: "Blog", path: "/blog" },
    { name: "Contactanos", path: "/contacto" }, // <--- NUEVO
  ];

  // Datos ficticios del carrito
  const cartItems = [
    {
      id: 1,
      name: "Kit Iniciado",
      price: "149€",
      image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=200&auto=format&fit=crop",
      quantity: 1
    },
    {
      id: 2,
      name: "Botas Trekking Pro",
      price: "120€",
      image: "https://images.unsplash.com/photo-1526772662000-3f88f107f5d8?q=80&w=200&auto=format&fit=crop",
      quantity: 1
    }
  ];

  return (
    <>
      <nav className={navClasses}>
        
        {/* 1. LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-xl font-bold text-white tracking-wide group-hover:text-[#B6AD90] transition-colors">
            Sole
          </span>
        </Link>

        {/* 2. MENÚ DESKTOP */}
        <div className="hidden md:flex items-center gap-1 bg-black/10 rounded-full p-1 border border-white/5">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`
                  relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${
                    isActive
                      ? "bg-white text-[#333D29] shadow-sm"
                      : "text-gray-200 hover:text-white hover:bg-white/10"
                  }
                `}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* 3. BOTONES DERECHA */}
        <div className="flex items-center gap-3">
          
          {/* BOTÓN CARRITO */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white hover:text-[#333D29] transition-all border border-transparent hover:border-white/20"
            aria-label="Abrir Carrito"
          >
            <IconShoppingBag size={20} stroke={1.5} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#333D29]"></span>
          </button>

          {/* BOTÓN LOGIN */}
          <Link to="/login">
            <button
              className={`
                flex items-center justify-center w-10 h-10 rounded-full
                bg-[#582F0E] text-white border border-[#7F4F24]
                hover:bg-[#7F4F24] hover:scale-105 transition-all shadow-lg
              `}
              aria-label="Iniciar Sesión"
            >
              <IconUser size={20} stroke={1.5} />
            </button>
          </Link>

          {/* BOTÓN HAMBURGUESA */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
          >
            {isMobileMenuOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
          </button>
        </div>
      </nav>

      {/* --- CARRITO (SIDEBAR) --- */}
      
      {/* 1. Backdrop Oscuro */}
      <div 
        className={`
          fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm transition-opacity duration-500
          ${isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setIsCartOpen(false)}
      />

      {/* 2. Panel Deslizante (EFECTO CRISTAL/BLUR APLICADO) */}
      <div 
        className={`
          fixed top-0 right-0 z-[1001] h-full w-full md:w-[450px] shadow-2xl
          /* AQUÍ ESTÁ EL CAMBIO DE ESTILO: */
          bg-[#F2F2EF]/85 backdrop-blur-xl border-l border-white/40
          transform transition-transform duration-500 ease-out
          flex flex-col
          ${isCartOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header del Carrito (Transparente para seguir el efecto) */}
        <div className="flex items-center justify-between p-6 border-b border-[#333D29]/10">
          <h2 className="text-xl font-bold text-[#333D29]">Tu Cesta (2)</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full hover:bg-white/50 text-[#333D29] transition-colors"
          >
            <IconX size={24} stroke={1.5} />
          </button>
        </div>

        {/* Lista de Productos */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 items-center bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-white/50">
              {/* Imagen */}
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              {/* Info */}
              <div className="flex-1">
                <h3 className="font-bold text-[#333D29] text-sm mb-1">{item.name}</h3>
                <p className="text-[#656D4A] text-xs font-bold uppercase tracking-wider mb-2">Cantidad: {item.quantity}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#582F0E]">{item.price}</span>
                </div>
              </div>

              {/* Borrar */}
              <button className="text-gray-500 hover:text-red-500 transition-colors p-2">
                <IconTrash size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Footer (Total + Checkout) */}
        <div className="p-6 bg-white/40 backdrop-blur-md border-t border-[#333D29]/10 space-y-4">
          <div className="flex justify-between items-center text-[#333D29]">
            <span className="font-medium">Subtotal</span>
            <span className="font-bold text-xl">269€</span>
          </div>
          <p className="text-xs text-gray-600 text-center">Impuestos y envíos calculados al finalizar.</p>
          
          <button className="w-full py-4 bg-[#333D29] text-white font-bold rounded-full hover:bg-[#582F0E] transition-colors uppercase tracking-widest text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300">
            Finalizar Compra
          </button>
        </div>
      </div>

      {/* --- MENÚ MÓVIL --- */}
      <div
        className={`
          fixed inset-0 z-[990] bg-[#333D29]/95 backdrop-blur-xl transition-all duration-300
          flex flex-col items-center justify-center space-y-8
          ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
        `}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-3xl font-bold text-[#F0FDF4] hover:text-[#B6AD90] transition-colors"
          >
            {link.name}
          </Link>
        ))}
        
        <button 
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-8 right-8 text-white/50 hover:text-white"
        >
          <IconX size={32} />
        </button>
      </div>
    </>
  );
};

export default Navbar;