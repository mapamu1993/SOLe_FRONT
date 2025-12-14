import axios from "axios";

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
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
  MODERATOR: "moderator",
};

const client = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      !window.location.pathname.includes("/login")
    ) {
      window.dispatchEvent(new Event("auth:unauthorized"));
    }
    return Promise.reject(error);
  }
);

export default client;
