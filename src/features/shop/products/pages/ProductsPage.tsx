import { Link as RouterLink } from "react-router-dom";
import { useProductsQuery } from "../hooks/useProductsQuery";
import { useAddToCartMutation } from "../../cart/hooks/useCartMutations";
import { useAuth } from "../../../auth/context/auth.context";
import { IMAGE_URL, USER_ROLES } from "../../../../config/constants";

const ProductsPage = () => {
  const { data: products, isLoading, isError, error } = useProductsQuery();
  const { mutate: addToCart, isPending } = useAddToCartMutation();
  const { user } = useAuth();

  const isAdmin =
    user?.role === USER_ROLES.ADMIN || user?.role === USER_ROLES.MODERATOR;

  if (isLoading) return <div>Cargando productos...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Tienda</h1>

      {isAdmin && (
        <div style={{ marginBottom: "20px" }}>
          <RouterLink to="/products/new">
            <button>+ Crear Producto</button>
          </RouterLink>
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products?.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              width: "200px",
            }}
          >
            {product.image && (
              <img
                src={`${IMAGE_URL}/uploads/products/${product.image}`}
                alt={product.name}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
            )}
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button
              onClick={() => addToCart({ productId: product._id, quantity: 1 })}
              disabled={isPending}
            >
              Añadir al Carrito
            </button>
            <br />
            <RouterLink to={`/products/${product._id}`}>Ver detalle</RouterLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
