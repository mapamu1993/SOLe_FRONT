import { type Product } from "../../products/types/productTypes";

// Extendemos Product porque un Kit ES un Producto, pero en la UI
// le añadiremos propiedades calculadas para el diseño (destacado, features, etc.)
export interface Kit extends Product {
  features?: string[];       // Características punteadas para la tarjeta
  isRecommended?: boolean;   // Para marcar el "VIP" visualmente
}