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
  const { user } = useAuth();

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
      // Definimos si es VIP/Recomendado (Kit 3)
      const isVip =
        kit.isRecommended ||
        kit.name.toLowerCase().includes("premium") ||
        kit.price >= 1000;

      // Features por defecto si no vienen de BD
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
    // Lógica simplificada:
    // Si es VIP (Kit 3) -> Abrir formulario de contacto
    // Si NO es VIP (Kit 1 y 2) -> Añadir al carrito directamente
    if (kit.isRecommended) {
      setSelectedKit(kit);
      setIsContactOpen(true);
    } else {
      addToCart(
        { productId: kit._id, quantity: 1 },
        {
          onSuccess: () =>
            enqueueSnackbar("Kit añadido al carrito", { variant: "success" }),
          onError: () =>
            enqueueSnackbar("Error al añadir al carrito", { variant: "error" }),
        }
      );
    }
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
      // Modal Contacto (Solo para Kit 3/VIP)
      isContactOpen={isContactOpen}
      onCloseContact={handleCloseContact}
      selectedKitName={selectedKit?.name || ""}
      // Acción Principal (Carrito o Contacto)
      onKitAction={handleKitAction}
      // Admin
      canEdit={canEdit}
      onEditKit={handleEditKit}
      onDeleteKit={handleDeleteKit}
    />
  );
};

export default KitsPage;
