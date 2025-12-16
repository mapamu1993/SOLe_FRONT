import React from "react";
import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { IconPackage, IconPlus } from "@tabler/icons-react";

// Componentes
import { KitCard } from "./KitCard";
import { ContactForm } from "./ContactForm";
import { getImageUrl } from "../../../../utils/imageUtil";
import { type Kit } from "../types/kitTypes";

interface KitsPageDesignProps {
  kits: Kit[] | undefined;
  isLoading: boolean;
  isError: boolean;

  // Props Contacto (VIP)
  isContactOpen: boolean;
  onCloseContact: () => void;
  selectedKitName: string;

  // Acción principal
  onKitAction: (kit: Kit) => void;

  // Props Admin
  canEdit: boolean;
  onEditKit: (id: string) => void;
  onDeleteKit: (id: string, name: string) => void;
}

export const KitsPageDesign: React.FC<KitsPageDesignProps> = ({
  kits,
  isLoading,
  isError,
  isContactOpen,
  onCloseContact,
  selectedKitName,
  onKitAction,
  canEdit,
  onEditKit,
  onDeleteKit
}) => {
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 } 
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
    <div className="min-h-screen w-full bg-[#EBECE2] p-4 md:p-8 font-sans pt-24 md:pt-32">
      <div className="mx-auto w-full max-w-7xl">
        
        {/* CABECERA */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-[#582F0E] font-bold tracking-widest text-xs uppercase mb-2 block">
                Equipamiento Oficial
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#333D29] tracking-tight leading-tight">
                Elige tu <span className="italic font-serif text-[#582F0E]">Camino</span>
              </h1>
              <p className="mt-4 text-[#656D4A] text-lg max-w-2xl font-medium leading-relaxed">
                Packs diseñados para cada tipo de peregrino.
              </p>
            </motion.div>

            {/* Botón Crear Kit (Solo Admin) */}
            {canEdit && (
                <Link to="/kits/new">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 rounded-full bg-[#582F0E] px-8 py-3 text-sm font-bold text-white shadow-lg transition-colors hover:bg-[#7F4F24]"
                  >
                    <IconPlus size={18} />
                    Nuevo Kit
                  </motion.button>
                </Link>
            )}
        </div>

        {/* LOADING / ERROR */}
        {isLoading && (
          <div className="flex h-96 flex-col items-center justify-center text-[#582F0E]">
             <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#333D29] border-t-transparent mb-4" />
             <p className="font-bold text-lg animate-pulse">Cargando kits...</p>
          </div>
        )}

        {isError && (
          <div className="rounded-[2.5rem] border border-red-200 bg-red-50 p-10 text-center">
            <p className="font-bold text-xl text-red-800 mb-2">Error de conexión</p>
            <p className="text-red-600">No pudimos cargar los kits disponibles.</p>
          </div>
        )}

        {/* GRID DE KITS */}
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
                kits.map((kit) => (
                    <motion.div 
                        key={kit._id} 
                        variants={itemVariants}
                        className="flex flex-col gap-4 group h-full"
                    >
                        <KitCard
                            image={getImageUrl(kit.image)}
                            title={kit.name}
                            description={kit.description}
                            price={kit.price}
                            features={kit.features}
                            isRecommended={kit.isRecommended}
                            
                            // Textos según tipo
                            tagLabel={kit.isRecommended ? "EXPERIENCIA VIP" : "BÁSICO"}
                            buttonText={kit.isRecommended ? "Solicitar Info" : "Añadir al Carrito"}
                            
                            // Acciones
                            onAction={() => onKitAction(kit)}
                            
                            // Admin
                            canEdit={canEdit}
                            onEdit={() => onEditKit(kit._id)}
                            onDelete={() => onDeleteKit(kit._id, kit.name)}
                        />
                    </motion.div>
                ))
            )}
          </motion.div>
        )}
      </div>

      <ContactForm
        open={isContactOpen}
        onClose={onCloseContact}
        kitName={selectedKitName}
      />
    </div>
  );
};