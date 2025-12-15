import { useMemo, useState } from "react";
import { useSnackbar } from "notistack";
// --- SOLUCIÓN: Añadimos las importaciones que faltaban ---
import { Link as RouterLink } from "react-router-dom";
import { useAddToCartMutation } from "../../cart/hooks/useCartMutations";
import { type Kit } from "../types/kitTypes";
// ---------------------------------------------------------
import { useKitsQuery } from "../hooks/useKitsQuery";
import { getImageUrl } from "@/utils/imageUtil";

const KitsPage = () => {
  // --- DATA FETCHING ---
  const { data: products } = useKitsQuery();
  const { mutate: addToCart } = useAddToCartMutation();
  const { enqueueSnackbar } = useSnackbar();

  // --- ESTADOS DE UI (Modales) ---
  // Estos estados se definen pero no se usaban en tu versión simplificada, 
  // los dejo tal cual estaban en tu archivo para no romper nada.
  const [selectedKit, setSelectedKit] = useState<Kit | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // --- TRANSFORMACIÓN DE DATOS (Product -> Kit) ---
  const kits: Kit[] | undefined = useMemo(() => {
    return products?.map((product) => {
      const isVip =
        product.price >= 1000 || product.name.toLowerCase().includes("premium");

      const defaultFeatures = [
        "Envío Gratuito",
        "Credencial del Peregrino",
        isVip ? "Asistencia 24h Premium" : "Guía Básica en PDF",
      ];

      return {
        ...product,
        features: defaultFeatures,
        isRecommended: isVip,
      };
    });
  }, [products]);

  // --- HANDLERS ---
  const handleAddToCart = (productId: string) => {
    addToCart(
      { productId, quantity: 1 },
      {
        onSuccess: () => {
           // Lógica original intacta
        },
      }
    );
  };

  const handleKitAction = (kit: any) => {
    const currentKit = kit as Kit;
    setSelectedKit(currentKit);

    if (currentKit.isRecommended) {
      // TODO: Implement contact modal
    } else if (currentKit.price >= 300) {
      setIsCustomizerOpen(true);
    } else {
      handleAddToCart(currentKit._id);
    }
  };

  // --- RENDER ---
  return (
    <div>
      <h1>Kits del Peregrino</h1>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {kits?.map((kit) => (
          <div
            key={kit._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "250px",
            }}
          >
            {kit.image && (
              <img
                src={getImageUrl(`uploads/products/${kit.image}`)}
                alt={kit.name}
                style={{ width: "100%", height: "auto" }}
              />
            )}
            <h3>{kit.name}</h3>
            <p>${kit.price}</p>
            <p>{kit.description}</p>
            {/* Ahora RouterLink funcionará porque lo hemos importado arriba */}
            <RouterLink to={`/products/${kit._id}`}>Ver Detalles</RouterLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KitsPage;