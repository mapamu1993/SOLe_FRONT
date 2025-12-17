import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

// 1. Imports necesarios
import { useKitsQuery } from "../hooks/useKitsQuery";
import { useAddToCartMutation } from "../../cart/hooks/useCartMutations";
import { useDeleteKitMutation } from "../hooks/useKitsMutation";
import { type Kit } from "../types/kitTypes";
import { useAuth } from "../../../auth/context/auth.context";
import { USER_ROLES } from "../../../../config/constants";
import { KitsPageDesign } from "../components/KitsPageDesign";

const KitsPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth(); // Importamos isAuthenticated

  const canEdit =
    user?.role === USER_ROLES.ADMIN || user?.role === USER_ROLES.MODERATOR;

  // --- DATA FETCHING ---
  const { data: serverKits, isLoading, isError } = useKitsQuery();
  const { mutate: deleteKit } = useDeleteKitMutation();
  const { mutate: addToCart, isPending: isAdding } = useAddToCartMutation();
  const { enqueueSnackbar } = useSnackbar();

  // --- ESTADOS DE UI ---
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedKit, setSelectedKit] = useState<Kit | null>(null);

  // --- TRANSFORMACIÓN DE DATOS ---
  const kits = useMemo(() => {
    if (!serverKits) return [];
    return serverKits.map((kit) => {
      // Definimos si es VIP/Recomendado
      const isVip =
        kit.isRecommended ||
        kit.name.toLowerCase().includes("premium") ||
        kit.price >= 1000;

      const defaultFeatures = isVip
        ? [
            "Alojamiento Premium",
            "Transporte de Equipaje",
            "Asistencia 24h",
            "Credencial Oficial",
          ]
        : ["Alojamiento Estándar", "Guía en PDF", "Credencial Oficial"];

      return {
        ...kit,
        features:
          kit.features && kit.features.length > 0
            ? kit.features
            : defaultFeatures,
        isRecommended: isVip,
      };
    });
  }, [serverKits]);

  // --- HANDLERS ---
  const handleEditKit = (kitId: string) => {
    navigate(`/kits/edit/${kitId}`);
  };

  const handleDeleteKit = (kitId: string, kitName: string) => {
    if (
      window.confirm(
        `¿Estás seguro de que quieres eliminar el kit "${kitName}"?`
      )
    ) {
      deleteKit(kitId, {
        onSuccess: () =>
          enqueueSnackbar(`Kit eliminado correctamente`, {
            variant: "success",
          }),
        onError: () =>
          enqueueSnackbar(`Error al eliminar el kit`, { variant: "error" }),
      });
    }
  };

  const handleKitAction = (kit: Kit) => {
    // Si es VIP -> Formulario de Contacto
    if (kit.isRecommended) {
      setSelectedKit(kit);
      setIsContactOpen(true);
      return;
    }

    // Si es un Kit normal -> Añadir al Carrito
    // 1. Verificamos si el usuario está logueado
    if (!isAuthenticated) {
      enqueueSnackbar("Inicia sesión para añadir productos", {
        variant: "info",
      });
      navigate("/login");
      return;
    }

    // 2. Ejecutamos la mutación
    addToCart(
      { productId: kit._id, quantity: 1, productModel: "Kit" },
      {
        onSuccess: () =>
          enqueueSnackbar(`"${kit.name}" añadido a tu mochila`, {
            variant: "success",
          }),
        onError: (error: any) => {
          // Si el error es 401 (no autorizado), forzamos logout/login
          if (error.response?.status === 401) {
            enqueueSnackbar("Tu sesión ha expirado", { variant: "warning" });
            navigate("/login");
          } else {
            enqueueSnackbar("Error al añadir al carrito", { variant: "error" });
          }
        },
      }
    );
  };

  const handleCloseContact = () => {
    setIsContactOpen(false);
    setSelectedKit(null);
  };

  return (
    <KitsPageDesign
      kits={kits}
      isLoading={isLoading || isAdding}
      isError={isError}
      // Modal Contacto
      isContactOpen={isContactOpen}
      onCloseContact={handleCloseContact}
      selectedKitName={selectedKit?.name || ""}
      // Acción Principal
      onKitAction={handleKitAction}
      // Admin
      canEdit={canEdit}
      onEditKit={handleEditKit}
      onDeleteKit={handleDeleteKit}
    />
  );
};

export default KitsPage;
