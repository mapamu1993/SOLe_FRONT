import { useMemo, useState } from "react";
import { useSnackbar } from "notistack";

// 1. Imports necesarios
import { useKitsQuery } from "../hooks/useKitsQuery";
import { useAddToCartMutation } from "../../cart/hooks/useCartMutations"; // <--- IMPORTANTE
import { type Kit } from "../types/kitTypes";
import { KitsPageDesign } from "../components/KitsPageDesign";

const KitsPage = () => {
  const { data: products, isLoading, isError } = useKitsQuery();
  const { enqueueSnackbar } = useSnackbar();

  // 2. Traemos la mutación del carrito
  const { mutate: addToCart, isPending: isAdding } = useAddToCartMutation(); // <--- EL GANCHO MÁGICO

  // Estados de UI
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedKit, setSelectedKit] = useState<Kit | null>(null);

  // Transformación de datos (Product -> Kit visual)
  const kits: Kit[] | undefined = useMemo(() => {
    return products?.map((product) => {
      const isVip =
        product.price >= 1000 || product.name.toLowerCase().includes("premium");

      const defaultFeatures = [
        "Envío Gratuito a toda España",
        "Credencial del Peregrino Oficial",
        isVip
          ? "Asistencia 24h Premium y Seguros"
          : "Guía Básica del Camino en PDF",
        "Devolución gratuita (30 días)",
      ];

      return {
        ...product,
        features: defaultFeatures,
        isRecommended: isVip,
      };
    });
  }, [products]);

  // --- HANDLERS (AQUÍ ESTÁ LA LÓGICA DE COMPRA) ---

  const handleKitAction = (kit: any) => {
    const currentKit = kit as Kit;
    setSelectedKit(currentKit);

    // 1. CASO VIP -> Contacto
    if (currentKit.isRecommended) {
      setIsContactOpen(true);
      return;
    }

    // 2. CASO MEDIO -> Personalizador
    if (currentKit.price >= 300) {
      setIsCustomizerOpen(true);
      return;
    }

    // 3. CASO BÁSICO -> AÑADIR AL CARRITO DIRECTAMENTE
    // <--- AQUÍ HACEMOS LA LLAMADA REAL
    addToCart(
      { productId: currentKit._id, quantity: 1 },
      {
        onSuccess: () => {
          // El hook ya muestra un snackbar, pero si quieres uno personalizado:
          // enqueueSnackbar(`¡${currentKit.name} añadido a la mochila!`, { variant: "success" });
        },
      }
    );
  };

  // Handler para cuando compras DESDE el Personalizador
  const handleCustomBuy = (total: number, items: string[]) => {
    if (!selectedKit) return;

    // Añadimos el kit base al carrito
    addToCart(
      { productId: selectedKit._id, quantity: 1 },
      {
        onSuccess: () => {
          enqueueSnackbar(`Kit personalizado añadido (Total: ${total}€)`, {
            variant: "success",
          });
          setIsCustomizerOpen(false);
        },
      }
    );
  };

  const handleCloseModals = () => {
    setIsCustomizerOpen(false);
    setIsContactOpen(false);
    setSelectedKit(null);
  };

  return (
    <KitsPageDesign
      kits={kits}
      isLoading={isLoading || isAdding}
      isError={isError}
      isCustomizerOpen={isCustomizerOpen}
      onCloseCustomizer={handleCloseModals}
      selectedKitBasePrice={selectedKit?.price || 0}
      onCustomBuy={handleCustomBuy}
      isContactOpen={isContactOpen}
      onCloseContact={handleCloseModals}
      selectedKitName={selectedKit?.name || ""}
      onKitAction={handleKitAction}
    />
  );
};

export default KitsPage;
