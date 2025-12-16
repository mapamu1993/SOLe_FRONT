import { Link } from "react-router-dom";
import { type Product } from "../types/productTypes";
import { getImageUrl } from "../../../../utils/imageUtil";
// 1. IMPORTAMOS 'Variants' PARA CORREGIR EL ERROR DE TIPADO
import { motion, type Variants } from "framer-motion"; 
import { IconPlus, IconShoppingBag } from "@tabler/icons-react";

interface ProductsListDesignProps {
  products: Product[] | undefined;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  isAdmin: boolean;
  onAddToCart: (productId: string) => void;
  isAddingToCart: boolean;
}

export const ProductsListDesign = ({
  products,
  isLoading,
  isError,
  errorMessage,
  isAdmin,
  onAddToCart,
  isAddingToCart,
}: ProductsListDesignProps) => {

  // --- DEFINICIÓN DE ANIMACIONES CON TIPADO ---
  
  // 2. AÑADIMOS ': Variants' AQUÍ
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // 3. Y AQUÍ TAMBIÉN PARA EVITAR EL ERROR EN EL MAP
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 50 } 
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#EBECE2] p-4 md:p-8 font-sans pt-24 md:pt-32">
      
      <div className="mx-auto w-full max-w-7xl">
        
        {/* CABECERA */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#333D29] tracking-tight">
              Explora la <span className="italic font-serif text-[#582F0E]">Tienda</span>
            </h1>
            <p className="mt-2 text-[#656D4A] uppercase tracking-widest text-xs font-bold">
              Equipamiento técnico para espíritus libres
            </p>
          </motion.div>

          {isAdmin && (
            <Link to="/products/new">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-full bg-[#582F0E] px-8 py-3 text-sm font-bold text-white shadow-lg transition-colors hover:bg-[#7F4F24]"
              >
                <IconPlus size={18} />
                Crear Producto
              </motion.button>
            </Link>
          )}
        </div>

        {/* ESTADO: CARGANDO */}
        {isLoading && (
          <div className="flex h-96 flex-col items-center justify-center text-[#582F0E]">
             <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#333D29] border-t-transparent mb-4" />
             <p className="font-bold text-lg animate-pulse">Buscando equipamiento...</p>
          </div>
        )}

        {/* ESTADO: ERROR */}
        {isError && (
          <div className="rounded-[2rem] border border-red-200 bg-red-50 p-10 text-center">
            <p className="font-bold text-xl text-red-800 mb-2">⚠️ Conexión interrumpida</p>
            <p className="text-red-600">{errorMessage || "No pudimos cargar los productos."}</p>
          </div>
        )}

        {/* LISTA DE PRODUCTOS */}
        {!isLoading && !isError && products && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {products.length === 0 ? (
              <div className="col-span-full py-20 text-center">
                <div className="inline-block p-6 rounded-full bg-white mb-4 shadow-sm">
                    <IconShoppingBag size={48} className="text-[#333D29]/30" />
                </div>
                <p className="text-[#656D4A] font-medium text-lg">No hay productos disponibles por ahora.</p>
              </div>
            ) : (
              products.map((product) => (
                <motion.div
                  key={product._id}
                  variants={itemVariants}
                  className="group relative flex flex-col bg-white rounded-[2.5rem] p-4 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-[#B6AD90]/30"
                >
                  {/* IMAGEN */}
                  <Link to={`/products/${product._id}`} className="block relative h-64 w-full overflow-hidden rounded-[2rem] bg-[#EBECE2]">
                    {product.image ? (
                      <img
                        src={getImageUrl(product.image)}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[#A4AC86]">
                        <span className="text-sm font-bold uppercase tracking-widest">Sin imagen</span>
                      </div>
                    )}
                    
                    {/* Badge Categoría */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#333D29]">
                        {product.category || "Equipo"}
                    </div>
                  </Link>

                  {/* INFO */}
                  <div className="flex flex-1 flex-col pt-6 px-2">
                    <div className="flex justify-between items-start mb-2">
                        <Link to={`/products/${product._id}`} className="flex-1 pr-4">
                            <h3 
                                className="text-lg font-bold text-[#333D29] leading-tight group-hover:text-[#582F0E] transition-colors line-clamp-2"
                                title={product.name}
                            >
                                {product.name}
                            </h3>
                        </Link>
                        <span className="text-xl font-bold text-[#582F0E] shrink-0">
                            ${product.price.toFixed(0)}
                        </span>
                    </div>

                    <p className="text-sm text-[#656D4A] line-clamp-2 mb-6 font-medium opacity-80">
                        {product.description}
                    </p>

                    {/* BOTÓN (Swipe) */}
                    <button
                      onClick={() => onAddToCart(product._id)}
                      disabled={isAddingToCart}
                      className="mt-auto group/btn relative w-full h-12 bg-[#333D29] text-white font-bold text-xs uppercase tracking-widest rounded-full overflow-hidden shadow-lg hover:shadow-[#B6AD90]/40 transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100"
                    >
                      <span className="absolute inset-0 w-full h-full bg-[#B6AD90] transform scale-x-0 origin-left transition-transform duration-500 group-hover/btn:scale-x-100 ease-out" />
                      
                      <span className="relative z-10 flex items-center justify-center gap-2 group-hover/btn:text-[#333D29] transition-colors">
                        {isAddingToCart ? (
                            <>
                                <span className="h-3 w-3 rounded-full border-2 border-current border-t-transparent animate-spin"/>
                                Añadiendo...
                            </>
                        ) : (
                            <>
                                Añadir al Carrito
                                <IconShoppingBag size={16} />
                            </>
                        )}
                      </span>
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};