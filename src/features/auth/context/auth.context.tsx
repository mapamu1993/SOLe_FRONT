//aquí es donde vamos a crear la lógica para que la sesión no se cierre al recargar la página

import React, { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../../../api/axios.client";
import type { User } from "../types/userTypes";
import { logoutUserService } from "../services/authService";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  //para autenticar con datos parciales: solo user, el email no es necesario
  updateUser: (userData: Partial<User>) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user_data");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser && parsedUser._id) {
            setUser(parsedUser);
          }
        }
      } catch (error) {
        console.error("Error al verificar la autenticación", error);
        localStorage.removeItem("user_data");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user_data", JSON.stringify(userData));
  };

  // Logout que intenta avisar al servidor pero garantiza limpiar local y redirigir
  const localLogout = () => {
    setUser(null);
    localStorage.removeItem("user_data");
    // Redirigimos a login usando location para no depender del Router (AuthProvider está fuera del Router)
    window.location.href = "/login";
  };

  const logout = async () => {
    try {
      await logoutUserService();
    } catch (error) {
      console.error("Error al cerrar sesión en el servidor:", error);
    } finally {
      localLogout();
    }
  };

  // Manejamos el evento global disparado por el interceptor de axios
  useEffect(() => {
    const handleForceLogout = () => {
      localLogout();
    };

    window.addEventListener("force-logout", handleForceLogout);
    return () => window.removeEventListener("force-logout", handleForceLogout);
  }, []);

  const updateUser = (newUserData: Partial<User>) => {
    if (!user) return;
    const mergedUser = { ...user, ...newUserData };
    setUser(mergedUser);
    localStorage.setItem("user_data", JSON.stringify(mergedUser));
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        updateUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthContextType;
