import { useProductsQuery } from "../hooks/useProductsQuery";
import { useAddToCartMutation } from "../../cart/hooks/useCartMutations";
import { useAuth } from "../../../auth/context/auth.context";
import { USER_ROLES } from "../../../../config/constants";
// Importamos el diseño nuevo
import { ProductsListDesign } from "../components/ProductListDesign";

const ProductsPage = () => {
  // LÓGICA ORIGINAL INTACTA
  const { data: products, isLoading, isError, error } = useProductsQuery();
  const { mutate: addToCart, isPending } = useAddToCartMutation();
  const { user } = useAuth();

  const isAdmin =
    user?.role === USER_ROLES.ADMIN || user?.role === USER_ROLES.MODERATOR;

  // Handler simple para conectar el botón del diseño con la mutación
  const handleAddToCart = (productId: string) => {
    addToCart({ productId, quantity: 1 });
  };

  // RENDERIZAMOS EL DISEÑO
  return (
    <ProductsListDesign
      products={products}
      isLoading={isLoading}
      isError={isError}
      errorMessage={error?.message}
      isAdmin={isAdmin}
      onAddToCart={handleAddToCart}
      isAddingToCart={isPending}
    />
  );
};

export default ProductsPage;