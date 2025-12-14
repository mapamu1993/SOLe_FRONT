import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/context/auth.context"; // Asegúrate de que la extensión .tsx no sea necesaria en el import
import { USER_ROLES } from "../config/constants";

// --- PAGES IMPORTS ---

// Auth Pages
import RegisterPage from "../features/auth/pages/RegisterPage";
import LoginPage from "../features/auth/pages/LoginPage";
import UserProfilePage from "../features/auth/pages/UserProfilePage";
import UpdateProfilePage from "../features/auth/pages/UpdateProfilePage";
import ForgotPasswordPage from "../features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "../features/auth/pages/ResetPasswordPage";

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
// Nota: No importaste EditProductPage en tu ejemplo,
// pero he dejado el hueco en la lógica de rutas más abajo.
import CartPage from "../features/shop/cart/pages/CartPage";
import OrdersPage from "../features/shop/orders/pages/OrdersPage";
import KitsPage from "../features/shop/kits/pages/KitsPage";

// --- COMPONENTE DE PROTECCIÓN DE RUTAS ---
const ProtectedRoute = ({
  children,
  requiredRoles,
}: {
  children: React.ReactElement;
  requiredRoles?: string[];
}) => {
  const { isAuthenticated, user, loading } = useAuth();

  // Si auth tiene estado de carga, puedes retornar null o un simple div para evitar parpadeos
  if (loading) return null;

  // 1. Si no está logueado -> Login
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // 2. Si hay roles requeridos y el usuario no los tiene -> Home o Página de error
  if (requiredRoles && !requiredRoles.includes(user?.role || "")) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// --- ROUTER PRINCIPAL ---
const AppRouter = () => {
  return (
    <Routes>
      {/* Redirección inicial */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* =========================================
          RUTAS PÚBLICAS (ACCESO LIBRE)
      ========================================= */}

      {/* --- AUTH --- */}
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
      <Route path="/resetpassword" element={<ResetPasswordPage />} />

      {/* --- CONTENIDO PÚBLICO (BLOG & SHOP) --- */}
      <Route path="/contact" element={<ContactPage />} />

      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:id" element={<BlogDetailsPage />} />

      <Route path="/tienda" element={<ProductsPage />} />
      <Route path="/kits" element={<KitsPage />} />
      <Route
        path="/products/:id"
        element={<div>Detalle producto pendiente</div>}
      />

      {/* =========================================
          RUTAS PRIVADAS (USUARIOS LOGUEADOS)
      ========================================= */}

      {/* Estas rutas requieren estar logueado, pero cualquier rol sirve */}
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

      {/* =========================================
          RUTAS ADMIN / MODERATOR
      ========================================= */}

      {/* --- GESTIÓN DE BLOG --- */}
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

      {/* --- GESTIÓN DE PRODUCTOS --- */}
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

      {/* Ejemplo para editar producto (cuando tengas la página) */}
      {/* <Route
        path="/products/edit/:id"
        element={
          <ProtectedRoute requiredRoles={[USER_ROLES.ADMIN, USER_ROLES.MODERATOR]}>
            <EditProductPage />
          </ProtectedRoute>
        }
      /> 
      */}

      {/* =========================================
          FALLBACK (404)
      ========================================= */}
      <Route path="*" element={<div>404 - Página no encontrada</div>} />
    </Routes>
  );
};

export default AppRouter;
