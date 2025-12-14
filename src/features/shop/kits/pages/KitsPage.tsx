import React, { useState } from "react";
// import { useKitsQuery } from "../../hooks/useKitsQuery"; // <--- COMENTAMOS ESTO DE MOMENTO
import { KitsPageDesign } from "../components/KitsPageDesign";

// --- DATOS DE PRUEBA (MOCK) ---
const MOCK_KITS = [
  {
    _id: "1",
    name: "Kit Peregrino Básico",
    price: 199,
    description:
      "La opción auténtica para quienes buscan la esencia. Incluye lo imprescindible para albergues públicos.",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
  },
  {
    _id: "2",
    name: "Kit Confort Personalizable",
    price: 450,
    description:
      "Céntrate en disfrutar. Nosotros transportamos tu mochila y te garantizamos descanso en habitación privada.",
    image:
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80",
  },
  {
    _id: "3",
    name: "Kit Santiago Premium VIP",
    price: 1200,
    description:
      "Historia, gastronomía y lujo. Vive el Camino alojándote en Paradores con servicio exclusivo.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
  },
];

const KitsPage = () => {
  // En lugar de llamar a la API, usamos nuestros datos falsos
  // const { data: kits, isLoading, isError } = useKitsQuery();

  const kits = MOCK_KITS;
  const isLoading = false;
  const isError = false;

  // ESTADOS
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const [selectedKitBasePrice, setSelectedKitBasePrice] = useState(0);
  const [selectedKitName, setSelectedKitName] = useState("");

  // --- LOGICA DE CLICKS ---
  const handleKitAction = (kit: any) => {
    const price = kit.price || 0;
    const name = kit.name?.toLowerCase() || "";

    // 1. CASO VIP (>1000€) -> Formulario Contacto
    if (price > 1000 || name.includes("premium") || name.includes("vip")) {
      setSelectedKitName(kit.name);
      setIsContactOpen(true);
    }
    // 2. CASO PERSONALIZABLE (>300€) -> Modal Extras
    else if (price >= 300) {
      setSelectedKitBasePrice(price);
      setIsCustomizerOpen(true);
    }
    // 3. CASO BÁSICO -> Alerta / Carrito
    else {
      alert(`¡Has añadido el ${kit.name} al carrito por ${kit.price}€!`);
    }
  };

  const handleCustomBuy = (total: number, items: string[]) => {
    alert(
      `Añadido Kit Personalizado.\nTotal: ${total}€\nExtras: ${items.join(
        ", "
      )}`
    );
    setIsCustomizerOpen(false); // Cerramos modal al terminar
  };

  const handleCloseCustomizer = () => setIsCustomizerOpen(false);
  const handleCloseContact = () => setIsContactOpen(false);

  return (
    <KitsPageDesign
      kits={kits}
      isLoading={isLoading}
      isError={isError}
      isCustomizerOpen={isCustomizerOpen}
      onCloseCustomizer={handleCloseCustomizer}
      selectedKitBasePrice={selectedKitBasePrice}
      onCustomBuy={handleCustomBuy}
      isContactOpen={isContactOpen}
      onCloseContact={handleCloseContact}
      selectedKitName={selectedKitName}
      onKitAction={handleKitAction}
    />
  );
};

export default KitsPage;
