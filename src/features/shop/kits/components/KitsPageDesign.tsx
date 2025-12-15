import React from "react";
// import { Link as RouterLink } from "react-router-dom";
import { IMAGE_URL } from "../../../../config/constants"; // Ajusta a tu config

// Importamos los componentes
import { KitCard } from "./KitCard";
import { KitDetail } from "./KitDetail";
import { CustomizerForm } from "./CustomizerForm";
import { ContactForm } from "./ContactForm";

interface KitsPageDesignProps {
  kits: any[] | undefined;
  isLoading: boolean;
  isError: boolean;

  // Props Modal Personalizador
  isCustomizerOpen: boolean;
  onCloseCustomizer: () => void;
  selectedKitBasePrice: number;
  onCustomBuy: (total: number, items: string[]) => void;

  // Props Modal Contacto VIP
  isContactOpen: boolean;
  onCloseContact: () => void;
  selectedKitName: string;

  // Acción Genérica
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
  // --- FUNCIÓN PARA DETECTAR SI LA IMAGEN ES DE INTERNET O LOCAL ---
  const getImageUrl = (img: string) => {
    if (!img) return "https://via.placeholder.com/400"; // Si no hay imagen
    if (img.startsWith("http")) return img; // Si es una URL completa (Mocks/Internet)
    return `${IMAGE_URL}/uploads/products/${img}`; // Si es un archivo local (Tu Backend)
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fdfcf5]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#582F0E]"></div>
          <p className="text-[#656D4A] font-serif italic">
            Preparando tu camino...
          </p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fdfcf5]">
        <p className="text-red-600 font-bold bg-red-50 p-4 rounded-lg border border-red-200">
          Hubo un error al cargar los kits.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#fdfcf5] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* ENCABEZADO */}
        <div className="text-center mb-16">
          <span className="text-[#582F0E] font-bold tracking-widest text-sm uppercase mb-2 block">
            Tienda Oficial
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#333D29] font-serif mb-6 drop-shadow-sm">
            Kits del Peregrino
          </h1>
          <div className="h-1 w-24 bg-[#582F0E] mx-auto mb-6 rounded-full"></div>
          <p className="text-[#333D29] max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            Tres formas de vivir el camino. Elige tu nivel de confort.
          </p>
        </div>

        {/* GRID DE KITS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {kits?.map((kit) => {
            // Detectamos si es VIP o Personalizable para ajustar el texto
            const isVip =
              kit.price > 1000 || kit.name.toLowerCase().includes("premium");
            const isCustom =
              !isVip &&
              (kit.price > 300 ||
                kit.name.toLowerCase().includes("personalizable"));

            return (
              <div key={kit._id} className="flex flex-col gap-4 group">
                <KitCard
                  title={kit.name}
                  price={kit.price}
                  // AQUÍ USAMOS LA NUEVA FUNCIÓN MÁGICA 👇
                  image={getImageUrl(kit.image)}
                  isRecommended={isVip}
                  tagLabel={
                    isVip
                      ? "EXPERIENCIA VIP"
                      : isCustom
                      ? "PERSONALIZABLE"
                      : "BÁSICO"
                  }
                  buttonText={
                    isVip
                      ? "Solicitar Presupuesto"
                      : isCustom
                      ? "Personalizar Pack"
                      : "Añadir al Carrito"
                  }
                  features={[
                    "Envío Gratuito",
                    "Credencial Oficial",
                    isVip ? "Asistencia Personal 24h" : "Asistencia Telefónica",
                  ]}
                  onAction={() => onKitAction(kit)}
                />

                <KitDetail
                  description={
                    kit.description || "Todo lo necesario para tu viaje."
                  }
                  sections={[
                    {
                      title: "El Pack Incluye",
                      items: ["Mochila Técnica", "Saco Sábana", "Guía Digital"],
                    },
                  ]}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL 1: PERSONALIZADOR */}
      <CustomizerForm
        open={isCustomizerOpen}
        onClose={onCloseCustomizer}
        basePrice={selectedKitBasePrice}
        onAddToCart={onCustomBuy}
      />

      {/* MODAL 2: CONTACTO VIP */}
      <ContactForm
        open={isContactOpen}
        onClose={onCloseContact}
        kitName={selectedKitName}
      />
    </div>
  );
};
