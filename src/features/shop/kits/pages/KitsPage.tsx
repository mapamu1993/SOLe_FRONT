import { useState } from "react";
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
  const { data: kits, isLoading, isError } = useKitsQuery();
  const { mutate: deleteKit } = useDeleteKitMutation();
  const { mutate: addToCart, isPending: isAdding } = useAddToCartMutation();
  const { enqueueSnackbar } = useSnackbar();

  // --- ESTADOS DE UI ---
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedKit, setSelectedKit] = useState<Kit | null>(null);

  // --- HANDLERS ---
  const handleEditKit = (kitId: string) => {
    navigate(`/kits/edit/${kitId}`);
  };

  const handleDeleteKit = (kitId: string, kitName: string) => {
    if (
      window.confirm(
        `¿Estás seguro de que quieres eliminar el kit "${kitName}"? Esta acción no se puede deshacer.`
      )
    ) {
      deleteKit(kitId, {
        onSuccess: () => {
          enqueueSnackbar(`Kit "${kitName}" eliminado`, { variant: "success" });
        },
        onError: () => {
          enqueueSnackbar(`Error al eliminar el kit`, {
            variant: "error",
          });
        },
      });
    }
  };

  const handleAddToCart = (productId: string) => {
    addToCart({ productId, quantity: 1 });
    enqueueSnackbar("Kit añadido al carrito", { variant: "success" });
  };

  const handleKitAction = (kit: Kit) => {
    setSelectedKit(kit);

    const isVip =
      kit.price >= 1000 || kit.name.toLowerCase().includes("premium");
    const isCustom =
      !isVip &&
      (kit.price >= 300 || kit.name.toLowerCase().includes("personalizable"));

    if (isVip) {
      setIsContactOpen(true);
    } else if (isCustom) {
      setIsCustomizerOpen(true);
    } else {
      handleAddToCart(kit._id);
    }
  };

  const handleCustomBuy = (total: number, items: string[]) => {
    if (!selectedKit) return;
    // Aquí podrías procesar los items extra, por ahora solo añadimos el base
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
      // Props UI Modales
      isCustomizerOpen={isCustomizerOpen}
      onCloseCustomizer={handleCloseModals}
      selectedKitBasePrice={selectedKit?.price || 0}
      onCustomBuy={handleCustomBuy}
      isContactOpen={isContactOpen}
      onCloseContact={handleCloseModals}
      selectedKitName={selectedKit?.name || ""}
      onKitAction={handleKitAction}
      // Props Admin
      canEdit={canEdit}
      onEditKit={handleEditKit}
      onDeleteKit={handleDeleteKit}
    />
  );
};

export default KitsPage;
