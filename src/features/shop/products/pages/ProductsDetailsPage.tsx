import { useParams } from "react-router-dom";
import { useProductByIdQuery } from "../hooks/useProductsQuery";
import { useAddToCartMutation } from "../../cart/hooks/useCartMutations";
import { ProductDetailsDesign } from "../components/ProductDetailsDesign";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: product, isLoading, isError } = useProductByIdQuery(id || "");
  const { mutate: addToCart, isPending } = useAddToCartMutation();

  const handleAddToCart = (productId: string) => {
    addToCart({ 
      productId, 
      quantity: 1, 
      productModel: "Product" 
    });
  };

  return (
    <ProductDetailsDesign
      product={product}
      isLoading={isLoading}
      isError={isError}
      onAddToCart={handleAddToCart}
      isAddingToCart={isPending}
    />
  );
};

export default ProductDetailsPage;