import { useMemo, useState } from "react";
import { useSnackbar } from "notistack";

// 1. Hooks y Tipos
import { useKitsQuery } from "../hooks/useKitsQuery";
import { IMAGE_URL } from "../../../../config/constants";
import { getImageUrl } from "@/utils/imageUtil";
const KitsPage = () => {
  // --- DATA FETCHING ---
  const { data: products, isLoading, isError } = useKitsQuery();
  const { mutate: addToCart, isPending: isAdding } = useAddToCartMutation();
  const { enqueueSnackbar } = useSnackbar();

  // --- ESTADOS DE UI (Modales) ---
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedKit, setSelectedKit] = useState<Kit | null>(null);

  // --- TRANSFORMACIÓN DE DATOS (Product -> Kit) ---
  // Convertimos los productos planos en Kits con propiedades visuales
  const kits: Kit[] | undefined = useMemo(() => {
    return products?.map((product) => {
      // Lógica para determinar si es VIP o Personalizable basada en precio o nombre
      // Esto simula la lógica de negocio visual
      const isVip =
        product.price >= 1000 || product.name.toLowerCase().includes("premium");

      // Generamos features dinámicas si no vienen del backend
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

  // Acción principal al pulsar el botón de la tarjeta
  const handleKitAction = (kit: any) => {
    // Casteamos a Kit para estar seguros
    const currentKit = kit as Kit;
    setSelectedKit(currentKit);

    // Lógica de redirección según el tipo de Kit
    if (currentKit.isRecommended) {
      // Si es VIP -> Formulario de Contacto
      setIsContactOpen(true);
    } else if (currentKit.price >= 300) {
      // Si es gama media -> Personalizador
      setIsCustomizerOpen(true);
    } else {
      // Si es básico -> Añadir al carrito directo
      handleAddToCart(currentKit._id);
    }
  };

  // Añadir al carrito (Conexión con tu hook existente)
  const handleAddToCart = (productId: string) => {
    addToCart(
      { productId, quantity: 1 },
      {
        onSuccess: () => {
          // El hook ya muestra snackbar, pero si quieres feedback extra aquí
        },
      }
    );
  };

  // Compra desde el personalizador
  const handleCustomBuy = (total: number, items: string[]) => {
    if (!selectedKit) return;

    // NOTA: Como el endpoint 'addCart' actual solo soporta ID y cantidad,
    // añadimos el producto base. Idealmente enviaríamos los extras al backend.
    addToCart(
      { productId: selectedKit._id, quantity: 1 },
      {
        onSuccess: () => {
          enqueueSnackbar(`Kit personalizado añadido por ${total}€`, {
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
            <RouterLink to={`/products/${kit._id}`}>Ver Detalles</RouterLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KitsPage;
