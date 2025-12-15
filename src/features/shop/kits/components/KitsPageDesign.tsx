import React from "react";
import { IMAGE_URL } from "../../../../config/constants";
import { motion, type Variants } from "framer-motion";
import { IconPackage } from "@tabler/icons-react";

// Importamos los componentes hijos
import { KitCard } from "./KitCard";
import { KitDetail } from "./KitDetail";
import { CustomizerForm } from "./CustomizerForm";
import { ContactForm } from "./ContactForm";

interface KitsPageDesignProps {
  kits: any[] | undefined;
  isLoading: boolean;
  isError: boolean;

  // Props Modales
  isCustomizerOpen: boolean;
  onCloseCustomizer: () => void;
  selectedKitBasePrice: number;
  onCustomBuy: (total: number, items: string[]) => void;

  isContactOpen: boolean;
  onCloseContact: () => void;
  selectedKitName: string;

  onKitAction: (kit: any) => void;
}

export const KitsPageDesign: React.FC<KitsPageDesignProps> = ({
  kits,
  isLoading,
  isError,
  isCustomizerOpen,
  onCloseCustomizer,
  selectedKitBasePrice,
  onCustomBuy,
  isContactOpen,
  onCloseContact,
  selectedKitName,
  onKitAction,
}) => {
  
  // --- UTILIDAD DE IMAGEN ---
  const getImageUrl = (img: string) => {
    if (!img) return "https://via.placeholder.com/400";
    if (img.startsWith("http")) return img;
    return `${IMAGE_URL}/uploads/products/${img}`;
  };

  // --- ANIMACIONES (Igual que Blog y Tienda) ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 } // Un poco más lento para apreciar los kits
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 50 } 
    }
  };

  return (
    // 1. FONDO BASE (El mismo gris/beige de tu marca)
    <div className="min-h-screen w-full bg-[#EBECE2] p-4 md:p-8 font-sans pt-24 md:pt-32">
      
      <div className="mx-auto w-full max-w-7xl">
        
        {/* 2. CABECERA ANIMADA */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12 text-center md:text-left"
        >
          <span className="text-[#582F0E] font-bold tracking-widest text-xs uppercase mb-2 block">
            Equipamiento Oficial
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#333D29] tracking-tight leading-tight">
            Elige tu <span className="italic font-serif text-[#582F0E]">Camino</span>
          </h1>
          <p className="mt-4 text-[#656D4A] text-lg max-w-2xl font-medium leading-relaxed md:mx-0 mx-auto">
            Tres niveles de experiencia diseñados para que solo te preocupes de caminar. 
            Desde lo esencial hasta el lujo técnico.
          </p>
        </motion.div>

        {/* 3. ESTADOS DE CARGA / ERROR */}
        {isLoading && (
          <div className="flex h-96 flex-col items-center justify-center text-[#582F0E]">
             <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#333D29] border-t-transparent mb-4" />
             <p className="font-bold text-lg animate-pulse">Preparando equipo...</p>
          </div>
        )}

        {isError && (
          <div className="rounded-[2.5rem] border border-red-200 bg-red-50 p-10 text-center">
            <p className="font-bold text-xl text-red-800 mb-2">⚠️ Error de conexión</p>
            <p className="text-red-600">No pudimos cargar los kits disponibles.</p>
          </div>
        )}

        {/* 4. GRID DE KITS (Animado) */}
        {!isLoading && !isError && kits && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
          >
            {kits.length === 0 ? (
                <div className="col-span-full py-20 text-center text-[#656D4A]">
                    <IconPackage size={48} className="mx-auto mb-4 opacity-50" stroke={1.5} />
                    <p className="text-lg">No hay kits disponibles por el momento.</p>
                </div>
            ) : (
                kits.map((kit) => {
                    const isVip = kit.price > 1000 || kit.name.toLowerCase().includes("premium");
                    const isCustom = !isVip && (kit.price > 300 || kit.name.toLowerCase().includes("personalizable"));

                    return (
                        <motion.div 
                            key={kit._id} 
                            variants={itemVariants}
                            className="flex flex-col gap-4 group"
                        >
                            {/* Tarjeta Principal */}
                            <KitCard
                                title={kit.name}
                                price={kit.price}
                                image={getImageUrl(kit.image)}
                                isRecommended={isVip}
                                tagLabel={isVip ? "EXPERIENCIA VIP" : isCustom ? "PERSONALIZABLE" : "BÁSICO"}
                                buttonText={isVip ? "Solicitar Presupuesto" : isCustom ? "Personalizar Pack" : "Añadir al Carrito"}
                                features={[
                                    "Envío Gratuito",
                                    "Credencial Oficial",
                                    isVip ? "Asistencia Personal 24h" : "Asistencia Telefónica",
                                ]}
                                onAction={() => onKitAction(kit)}
                            />

                            {/* Detalles Desplegables (Estilo Ticket) */}
                            <KitDetail
                                description={kit.description || "Todo lo necesario para tu viaje."}
                                sections={[
                                    {
                                        title: "El Pack Incluye",
                                        items: ["Mochila Técnica", "Saco Sábana", "Guía Digital"],
                                    },
                                ]}
                            />
                        </motion.div>
                    );
                })
            )}
          </motion.div>
        )}
      </div>

      {/* 5. MODALES (Mantienen su funcionalidad) */}
      <CustomizerForm
        open={isCustomizerOpen}
        onClose={onCloseCustomizer}
        basePrice={selectedKitBasePrice}
        onAddToCart={onCustomBuy}
      />

      <ContactForm
        open={isContactOpen}
        onClose={onCloseContact}
        kitName={selectedKitName}
      />
    </div>
  );
};