import { useProductsQuery } from "../hooks/useProductsQuery";
import { useAddToCartMutation } from "../../cart/hooks/useCartMutations";
import { useDeleteProductMutation } from "../hooks/useProductsMutations";
import { useAuth } from "../../../auth/context/auth.context";
import { USER_ROLES } from "../../../../config/constants";
import { ProductsListDesign } from "../components/ProductListDesign";

const ProductsPage = () => {
  const { data: products, isLoading, isError, error } = useProductsQuery();
  const { mutate: addToCart, isPending } = useAddToCartMutation();
  const { mutate: deleteProduct } = useDeleteProductMutation();
  const { user } = useAuth();

  const isAdmin =
    user?.role === USER_ROLES.ADMIN || user?.role === USER_ROLES.MODERATOR;

  const handleAddToCart = (productId: string) => {
    // CORRECCIÓN: Añadido productModel explícito
    addToCart({ 
      productId, 
      quantity: 1,
      productModel: "Product" 
    });
  };

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
      onDeleteProduct={handleDeleteProduct}
    />
  );
};

export default ProductsPage;