import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../features/Home/Home"

// Auth Pages
import RegisterPage from "../features/auth/pages/RegisterPage";
import LoginPage from "../features/auth/pages/LoginPage";
import UserProfilePage from "../features/auth/pages/UserProfilePage";
import UpdateProfilePage from "../features/auth/pages/UpdateProfilePage";
import ForgotPasswordPage from "../features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "../features/auth/pages/ResetPasswordPage";


// Blog Pages
import BlogPage from "../features/blog/pages/BlogPage";
import CreateBlogPage from "../features/blog/pages/CreateBlogPage";
import EditBlogPage from "../features/blog/pages/EditBlogPage";
import BlogDetailsPage from "../features/blog/pages/BlogDetailsPage";

// Shop Pages
import ProductsPage from "../features/shop/products/pages/ProductsPage";
import CreateProductPage from "../features/shop/products/pages/CreateProductPage";
import CartPage from "../features/shop/cart/pages/CartPage";
import OrdersPage from "../features/shop/orders/pages/OrdersPage";
import KitsPage from "../features/shop/kits/pages/KitsPage";

const AppRouter = () => {
  return (
    <Routes>
      {/* Redirección inicial */}
      <Route path="/" element={<Home />} />
      {/* --- AUTH --- */}
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<UserProfilePage />} />
      <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
      <Route path="/update" element={<UpdateProfilePage />} />
      <Route path="/resetpassword" element={<ResetPasswordPage />} />

      {/* --- BLOG --- */}
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/new" element={<CreateBlogPage />} />
      <Route path="/blog/:id" element={<BlogDetailsPage />} />
      <Route path="/blog/edit/:id" element={<EditBlogPage />} />

      {/* --- SHOP --- */}
      <Route path="/tienda" element={<ProductsPage />} />
      <Route path="/products/new" element={<CreateProductPage />} />
      {/* Añadimos ruta detalle producto si existe el componente, si no, usa la misma logica */}
      <Route
        path="/products/:id"
        element={<div>Detalle producto pendiente</div>}
      />

      <Route path="/cart" element={<CartPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/kits" element={<KitsPage />} />

      {/* Fallback 404 */}
      <Route path="*" element={<div>404 - Página no encontrada</div>} />
    </Routes>
  );
};

export default AppRouter;
