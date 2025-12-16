import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/context/auth.context";
import { USER_ROLES } from "../config/constants";

// 1. IMPORTANTE: Importamos el componente ScrollToTop
import ScrollToTop from "../components/shared/ScrollToTop";

// IMPORTAMOS EL LAYOUT
import Layout from "../components/layout/Layout";

// Homepage
import Home from "@/features/home/Home";
import AboutPage from "@/features/about/pages/AboutPage";

// Auth Pages
import RegisterPage from "../features/auth/pages/RegisterPage";
import LoginPage from "../features/auth/pages/LoginPage";
import UserProfilePage from "../features/auth/pages/UserProfilePage";
import UpdateProfilePage from "../features/auth/pages/UpdateProfilePage";
import ForgotPasswordPage from "../features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "../features/auth/pages/ResetPasswordPage";
import EditPasswordPage from "../features/auth/pages/EditPasswordPage";

// Contact Page
import ContactPage from "../features/contact/pages/ContactPage";

// Blog Pages
import BlogPage from "../features/blog/pages/BlogPage";
import CreateBlogPage from "../features/blog/pages/CreateBlogPage";
import EditBlogPage from "../features/blog/pages/EditBlogPage";
import BlogDetailsPage from "../features/blog/pages/BlogDetailsPage";

// Shop Pages
import ProductsPage from "../features/shop/products/pages/ProductsPage";
import CreateProductPage from "../features/shop/products/pages/CreateProductPage";
import EditProductPage from "../features/shop/products/pages/EditProductPage";
import CartPage from "../features/shop/cart/pages/CartPage";
import OrdersPage from "../features/shop/orders/pages/OrdersPage";
import KitsPage from "../features/shop/kits/pages/KitsPage";
import ProductsDetailsPage from "../features/shop/products/pages/ProductsDetailsPage";
import CreateKitPage from "../features/shop/kits/pages/CreateKitPage";
import EditKitPage from "../features/shop/kits/pages/EditKitPage";

const ProtectedRoute = ({
  children,
  requiredRoles,
}: {
  children: React.ReactElement;
  requiredRoles?: string[];
}) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (requiredRoles && !requiredRoles.includes(user?.role || "")) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRouter = () => {
  return (
    <>
      {/* 2. IMPORTANTE: Renderizamos ScrollToTop AQUÍ, antes de las rutas */}
      <ScrollToTop />

      <Routes>
        {/* Páginas sin Layout (sin navbar ni footer) */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* ENVOLVEMOS TODO EN EL LAYOUT 
            Así el Navbar y Footer aparecen en todas estas páginas 
        */}
        <Route element={<Layout />}>
          {/* PÚBLICAS */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
          <Route path="/resetpassword" element={<ResetPasswordPage />} />
          <Route path="/editpassword" element={<EditPasswordPage />} />

          <Route path="/contacto" element={<ContactPage />} />

          {/* BLOG */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailsPage />} />

          {/* TIENDA */}
          <Route path="/tienda" element={<ProductsPage />} />
          <Route path="/kits" element={<KitsPage />} />
          <Route path="/products/:id" element={<ProductsDetailsPage />} />

          {/* PRIVADAS */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update"
            element={
              <ProtectedRoute>
                <UpdateProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />

          {/* ADMIN BLOG */}
          <Route
            path="/blog/new"
            element={
              <ProtectedRoute
                requiredRoles={[USER_ROLES.ADMIN, USER_ROLES.MODERATOR]}
              >
                <CreateBlogPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog/edit/:id"
            element={
              <ProtectedRoute
                requiredRoles={[USER_ROLES.ADMIN, USER_ROLES.MODERATOR]}
              >
                <EditBlogPage />
              </ProtectedRoute>
            }
          />

          {/* ADMIN PRODUCTOS */}
          <Route
            path="/products/new"
            element={
              <ProtectedRoute
                requiredRoles={[USER_ROLES.ADMIN, USER_ROLES.MODERATOR]}
              >
                <CreateProductPage />
              </ProtectedRoute>
            }
          />
        <Route
          path="/products/edit/:id"
          element={
            <ProtectedRoute
              requiredRoles={[USER_ROLES.ADMIN, USER_ROLES.MODERATOR]}
            >
              <EditProductPage />
            </ProtectedRoute>
          }
        />
          {/* ADMIN KITS */}
          <Route
            path="/kits/edit/:id"
            element={
              <ProtectedRoute
                requiredRoles={[USER_ROLES.ADMIN, USER_ROLES.MODERATOR]}
              >
                <EditKitPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/kits/new"
            element={
              <ProtectedRoute
                requiredRoles={[USER_ROLES.ADMIN, USER_ROLES.MODERATOR]}
              >
                <CreateKitPage />
              </ProtectedRoute>
            }
          />

          {/* 404 por si no hay nada */}
          <Route
            path="*"
            element={
              <div className="text-center py-20">404 - Página no encontrada</div>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;