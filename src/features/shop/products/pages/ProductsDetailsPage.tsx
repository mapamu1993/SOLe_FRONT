import { useParams } from "react-router-dom";
import { useProductByIdQuery } from "../hooks/useProductsQuery";
import { useAddToCartMutation } from "../../cart/hooks/useCartMutations"; // Reutilizamos tu lógica de carrito
import { ProductDetailsDesign } from "../components/ProductDetailsDesign";

const ProductDetailsPage = () => {
  // 1. Obtener ID de la URL
  const { id } = useParams<{ id: string }>();

  // 2. Traer datos del producto
  const { data: product, isLoading, isError } = useProductByIdQuery(id || "");

  // 3. Mutación para añadir al carrito
  const { mutate: addToCart, isPending } = useAddToCartMutation();

  const handleAddToCart = (productId: string) => {
    addToCart({ productId, quantity: 1 });
  };

  // 4. Renderizar Diseño
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
