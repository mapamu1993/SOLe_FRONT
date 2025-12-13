import { Link as RouterLink } from "react-router-dom";
import { useKitsQuery } from "../hooks/useKitsQuery";
import { IMAGE_URL } from "../../../../config/constants";

const KitsPage = () => {
  const { data: kits, isLoading, isError } = useKitsQuery();

  if (isLoading) return <div>Cargando kits...</div>;
  if (isError) return <div>Error al cargar kits.</div>;

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
                src={`${IMAGE_URL}/uploads/products/${kit.image}`}
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
