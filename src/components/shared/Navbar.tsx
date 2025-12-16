// --- IMPORTACIONES ---
import { useAuth } from "../../features/auth/context/auth.context";
import { getUserProfileUrl } from "../../utils/imageUtil";
import { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  IconUser,
  IconMenu2,
  IconX,
  IconShoppingBag,
  IconTrash,
  IconPlus,
  IconMinus,
} from "@tabler/icons-react";
import { getImageUrl } from "../../utils/imageUtil";

// HOOKS
import { useCartQuery } from "../../features/shop/cart/hooks/useCartQuery";
import {
  useRemoveItemMutation,
  useUpdateCartMutation,
} from "../../features/shop/cart/hooks/useCartMutations";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();

  // CONEXIÓN CON LA LÓGICA DEL CARRITO
  const { data: cart, isLoading } = useCartQuery();
  const { mutate: removeItem } = useRemoveItemMutation();
  const { mutate: updateCart } = useUpdateCartMutation();

  const { isAuthenticated, user } = useAuth();

  // --- PROTECCIÓN EN CÁLCULO DE ITEMS ---
  const totalItems = useMemo(() => {
    if (!cart?.items) return 0;
    return cart.items.reduce((acc, item) => {
      // Si el producto fue borrado (es null), no lo contamos
      if (!item.product) return acc;
      return acc + item.quantity;
    }, 0);
  }, [cart]);

  // --- PROTECCIÓN CRÍTICA EN SUBTOTAL ---
  const subtotal = useMemo(() => {
    if (!cart?.items) return 0;
    return cart.items.reduce((acc, item) => {
      // Si el producto no existe, saltamos esta iteración para que no haya errores
      if (!item.product) return acc;
      return acc + item.product.price * item.quantity;
    }, 0);
  }, [cart]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // AJUSTE REALIZADO AQUÍ:
  // Cambiado 'top-4' por 'top-2' (cuando hay scroll)
  // Cambiado 'top-6' por 'top-4' (cuando no hay scroll)
  // Esto reduce el margen superior y equilibra la posición visual.
  const navClasses = `fixed left-1/2 -translate-x-1/2 z-[999] transition-all duration-300 ease-in-out flex items-center justify-between border border-white/10 backdrop-blur-md ${
    scrolled
      ? "top-2 w-[90%] max-w-5xl rounded-full bg-[#333D29]/90 py-3 px-6 shadow-2xl"
      : "top-4 w-[95%] max-w-6xl rounded-full bg-black/20 py-4 px-8"
  }`;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Nosotros", path: "/about" },
    { name: "Tienda", path: "/tienda" },
    { name: "Kits", path: "/kits" },
    { name: "Blog", path: "/blog" },
    { name: "Contáctanos", path: "/contacto" },
  ];

  return (
    <>
      <nav className={navClasses}>
<<<<<<< HEAD
        <Link
          to="/"
          className="
        flex
        items-center 
        gap-2 
        group"
        >
          <span
            className="
          text-xl 
          font-bold 
          text-white 
          tracking-wide 
          group-hover:text-[#B6AD90] 
          transition-colors
          "
          >
            Sole
          </span>
=======
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-xl font-bold text-white tracking-wide group-hover:text-[#B6AD90] transition-colors">SOL-e</span>
>>>>>>> main
        </Link>

        <div
          className="
        hidden 
        md:flex 
        items-center 
        gap-1 
        bg-black/10 
        rounded-full 
        p-1 
        border 
        border-white/5
        "
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                location.pathname === link.path
                  ? "bg-white text-[#333D29] shadow-sm"
                  : "text-gray-200 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div
          className="
        flex 
        items-center 
        gap-3
        "
        >
          <button
            onClick={() => setIsCartOpen(true)}
            className="
          relative 
          flex 
          items-center 
          justify-center 
          w-10 
          h-10 
          rounded-full 
          bg-white/10 
          text-white 
          hover:bg-white 
          hover:text-[#333D29] 
          transition-all 
          border 
          border-transparent 
          hover:border-white/20
          "
          >
            <IconShoppingBag size={20} stroke={1.5} />
            {totalItems > 0 && (
              <span
                className="
            absolute 
            top-2 
            right-2 
            w-2 
            h-2 
            bg-red-500 
            rounded-full 
            border 
            border-[#333D29]
            "
              ></span>
            )}
          </button>

          {/* LÓGICA DE PERFIL / LOGIN */}
          <Link to={isAuthenticated ? "/profile" : "/login"}>
            {isAuthenticated ? (
              <button
                className="
              flex 
              items-center 
              justify-center
              w-10 
              h-10 
              rounded-full 
              bg-[#582F0E] 
              text-white 
              border border-[#7F4F24] 
              hover:bg-[#7F4F24] 
              hover:scale-105 
              transition-all 
              shadow-lg 
              overflow-hidden
              "
              >
                {user?.image ? (
                  <img
                    src={getUserProfileUrl(user.image)}
                    alt="Perfil"
                    className="
                    w-full 
                    h-full 
                    object-cover
                    "
                  />
                ) : (
                  <IconUser size={20} stroke={1.5} />
                )}
              </button>
            ) : (
              <button
                className="
              flex 
              items-center 
              justify-center 
              h-10 
              px-5 
              rounded-full 
              bg-[#582F0E] 
              text-white 
              border 
              border-[#7F4F24] 
              hover:bg-[#7F4F24]
              hover:scale-105 
              transition-all 
              shadow-lg 
              text-xs 
              font-bold 
              uppercase 
              tracking-wider
              "
              >
                Login
              </button>
            )}
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="
          md:hidden 
          flex 
          items-center 
          justify-center 
          w-10 
          h-10 
          rounded-full 
          bg-white/10 
          text-white 
          hover:bg-white/20 
          transition-all
          "
          >
            <IconMenu2 size={20} />
          </button>
        </div>
      </nav>

      {/* --- CART DRAWER --- */}
      <div
        className={`fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
          isCartOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsCartOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 z-[1001] h-full w-full md:w-[450px] shadow-2xl bg-[#F2F2EF]/85 backdrop-blur-xl border-l border-white/40 transform transition-transform duration-500 ease-out flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="
        flex 
        items-center j
        ustify-between 
        p-6 
        border-b 
        border-[#333D29]/10
        "
        >
          <h2
            className="
          text-xl 
          font-bold 
          text-[#333D29]
          "
          >
            Tu Cesta ({totalItems})
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="
          p-2 
          rounded-full 
          hover:bg-white/50 
          text-[#333D29] 
          transition-colors
          "
          >
            <IconX size={24} stroke={1.5} />
          </button>
        </div>
        <div
          className="
        flex-1 
        overflow-y-auto 
        p-6 
        space-y-6
        "
        >
          {isLoading ? (
            <div
              className="
            flex 
            justify-center 
            p-10 
            text-[#656D4A]
            "
            >
              Cargando...
            </div>
          ) : !cart?.items || cart.items.length === 0 ? (
            <div
              className="
            text-center 
            py-10 
            text-[#656D4A]
            "
            >
              Tu carrito está vacío.
            </div>
          ) : (
            cart.items
              .filter((item) => item.product != null)
              .map((item) => (
                <div
                  key={item.product._id}
                  className="
                flex 
                gap-4 
                items-center 
                bg-white/60 
                backdrop-blur-sm 
                p-4 
                rounded-2xl 
                shadow-sm 
                border 
                border-white/50
                "
                >
                  <div
                    className="
                  w-20 
                  h-20 
                  rounded-xl 
                  overflow-hidden 
                  bg-gray-100 
                  shrink-0
                  "
                  >
                    <img
                      src={getImageUrl(item.product.image)}
                      alt={item.product.name}
                      className="
                    w-full 
                    h-full 
                    object-cover
                    "
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="
                    font-bold 
                    text-[#333D29] 
                    text-sm 
                    mb-1
                    "
                    >
                      {item.product.name}
                    </h3>
                    <div
                      className="
                    flex 
                    justify-between 
                    items-center 
                    mt-2
                    "
                    >
                      <span
                        className="
                      font-bold 
                      text-[#582F0E]
                      "
                      >
                        {item.product.price}€
                      </span>
                      <div
                        className="
                      flex 
                      items-center 
                      gap-1 
                      bg-white 
                      rounded 
                      px-1 
                      border 
                      border-[#333D29]/10
                      "
                      >
                        <button
                          onClick={() =>
                            updateCart({
                              productId: item.product._id,
                              quantity: -1,
                            })
                          }
                          className="
                          p-1 
                          hover:text-[#582F0E]
                          "
                        >
                          <IconMinus size={14} />
                        </button>
                        <span
                          className="
                          text-xs 
                          font-bold 
                          w-4 
                          text-center
                          "
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCart({
                              productId: item.product._id,
                              quantity: 1,
                            })
                          }
                          className="
                          p-1 
                          hover:text-[#582F0E]
                          "
                        >
                          <IconPlus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.product._id)}
                    className="
                  text-gray-400 
                  hover:text-red-500 
                  p-2
                  "
                  >
                    <IconTrash size={18} />
                  </button>
                </div>
              ))
          )}
        </div>
        <div
          className="
        p-6 
        bg-white/40 
        backdrop-blur-md 
        border-t 
        border-[#333D29]/10 
        space-y-4
        "
        >
          <div
            className="
          flex 
          justify-between 
          items-center 
          text-[#333D29]
          "
          >
            <span className="font-medium">Subtotal</span>
            <span className="font-bold text-xl">{subtotal.toFixed(2)}€</span>
          </div>
          <Link to="/cart" onClick={() => setIsCartOpen(false)}>
            <button
              className="
            w-full 
            py-4 
            bg-[#333D29] 
            text-white 
            font-bold 
            rounded-full 
            hover:bg-[#582F0E] 
            transition-all 
            uppercase 
            tracking-widest 
            text-xs s
            hadow-lg
            "
            >
              Ver Carrito Completo
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;