import { useProductsQuery } from "../hooks/useProductsQuery";
import { useAddToCartMutation } from "../../cart/hooks/useCartMutations";
// Importar la mutación de borrar
import { useDeleteProductMutation } from "../hooks/useProductsMutations";
import { useAuth } from "../../../auth/context/auth.context";
import { USER_ROLES } from "../../../../config/constants";
import { ProductsListDesign } from "../components/ProductListDesign";

const ProductsPage = () => {
  const { data: products, isLoading, isError, error } = useProductsQuery();
  const { mutate: addToCart, isPending } = useAddToCartMutation();
  // Usar hook de borrar
  const { mutate: deleteProduct } = useDeleteProductMutation();
  const { user } = useAuth();

  const isAdmin =
    user?.role === USER_ROLES.ADMIN || user?.role === USER_ROLES.MODERATOR;

  const handleAddToCart = (productId: string) => {
    addToCart({ productId, quantity: 1 });
  };

  // Handler para borrar
  const handleDeleteProduct = (id: string) => {
    deleteProduct(id);
  };

  return (
    <ProductsListDesign
      products={products}
      isLoading={isLoading}
      isError={isError}
      errorMessage={error?.message}
      isAdmin={isAdmin}
      onAddToCart={handleAddToCart}
      isAddingToCart={isPending}
      // Pasamos la prop
      onDeleteProduct={handleDeleteProduct}
    />
  );
};

export default ProductsPage;
