import { useMemo, useState } from "react";
import { useSnackbar } from "notistack";

// 1. Hooks y Tipos
import { useKitsQuery } from "../hooks/useKitsQuery";
import { useAddToCartMutation } from "../../cart/hooks/useCartMutations";
import { type Kit } from "../types/kitTypes";

// 2. IMPORTAMOS EL DISEÑO BONITO (Aquí está la clave)
import { KitsPageDesign } from "../components/KitsPageDesign";

const KitsPage = () => {
  // --- DATA FETCHING ---
  const { data: products, isLoading, isError } = useKitsQuery();
  const { mutate: addToCart } = useAddToCartMutation();
  const { enqueueSnackbar } = useSnackbar();

  // --- ESTADOS DE UI (Modales) ---
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedKit, setSelectedKit] = useState<Kit | null>(null);

  // --- TRANSFORMACIÓN DE DATOS (Product -> Kit) ---
  // Convertimos los productos "raw" en "Kits" con características visuales
  const kits: any[] | undefined = useMemo(() => {
    return products?.map((product) => {
      // Si vale más de 1000 o dice "Premium", lo tratamos como VIP
      const isVip =
        product.price >= 1000 || product.name.toLowerCase().includes("premium");

      // Características ficticias para que la tarjeta se vea llena
      // (Idealmente esto vendría de la base de datos)
      const defaultFeatures = [
        "Envío Gratuito a toda España",
        "Credencial del Peregrino Oficial",
        isVip ? "Asistencia 24h Premium" : "Guía Básica en PDF",
      ];

      return {
        ...product,
        features: defaultFeatures,
        isRecommended: isVip, // Esto hará que la tarjeta destaque
      };
    });
  }, [products]);

  // --- HANDLERS (Qué pasa al hacer click) ---

  // 1. Añadir directo al carrito
  const handleAddToCart = (productId: string) => {
    addToCart(
      { productId, quantity: 1 },
      {
        onSuccess: () => {
           // El hook ya muestra una notificación global
        },
      }
    );
  };

  // 2. Decidir qué acción tomar según el tipo de kit
  const handleKitAction = (kit: any) => {
    const currentKit = kit as Kit;
    setSelectedKit(currentKit);

    if (currentKit.isRecommended) {
      // Si es VIP -> Abrimos formulario de contacto
      setIsContactOpen(true);
    } else if (currentKit.price >= 300) {
      // Si es caro pero no VIP -> Abrimos personalizador
      setIsCustomizerOpen(true);
    } else {
      // Si es normal -> Al carrito directo
      handleAddToCart(currentKit._id);
    }
  };

  // 3. Comprar desde el personalizador (con extras)
  const handleCustomBuy = (total: number, items: string[]) => {
    if (!selectedKit) return;
    
    // Aquí solo añadimos el producto base.
    // (En el futuro podrías enviar los "items" extra al backend)
    addToCart(
      { productId: selectedKit._id, quantity: 1 },
      {
        onSuccess: () => {
          enqueueSnackbar(`Pack personalizado añadido (${total}€)`, {
            variant: "success",
          });
          setIsCustomizerOpen(false);
        },
      }
    );
  };

  // 4. Cerrar todo
  const handleCloseModals = () => {
    setIsCustomizerOpen(false);
    setIsContactOpen(false);
    setSelectedKit(null);
  };

  // --- RENDERIZADO ---
  // En lugar de HTML feo, usamos el componente de diseño
  return (
    <KitsPageDesign
      kits={kits}
      isLoading={isLoading}
      isError={isError}
      
      // Props para el Personalizador
      isCustomizerOpen={isCustomizerOpen}
      onCloseCustomizer={handleCloseModals}
      selectedKitBasePrice={selectedKit?.price || 0}
      onCustomBuy={handleCustomBuy}

      // Props para Contacto
      isContactOpen={isContactOpen}
      onCloseContact={handleCloseModals}
      selectedKitName={selectedKit?.name || ""}

      // Acción principal
      onKitAction={handleKitAction}
    />
  );
};

export default KitsPage;