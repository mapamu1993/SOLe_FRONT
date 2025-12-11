export const API_ROUTES = {
  USERS: "/users",
  BLOGS: "/blogs",
  PRODUCTS: "/products",
  ORDERS: "/orders",
  CART: "/cart",
  KITS: "/kits",
};

export const IMAGE_URL =
  import.meta.env.VITE_IMAGE_URL || "http://localhost:3000";

export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
  MODERATOR: "moderator",
};
