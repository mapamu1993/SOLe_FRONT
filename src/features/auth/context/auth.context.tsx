//aquí es donde vamos a crear la lógica para que la sesión no se cierre al recargar la página

import React, { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../../../api/axios.client";
import type { User } from "../types/userTypes";

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
  const logout = async () => {
    try {
      await axiosClient.post("/user/logout");
    } catch (error) {
      console.error(error);
    }
    setUser(null);
    localStorage.removeItem("user_data");
  };
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
