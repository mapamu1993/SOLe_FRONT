export const API_ROUTES = {
  USERS: "api/users",
  BLOGS: "api/blogs",
  PRODUCTS: "api/products",
  ORDERS: "api/orders",
  CART: "api/cart",
  KITS: "api/kits",
};

export const IMAGE_URL =
  import.meta.env.VITE_IMAGE_URL || "http://localhost:3000";

export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
  MODERATOR: "moderator",
};
