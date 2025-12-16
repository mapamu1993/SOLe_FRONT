import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { type User } from "../types/userTypes";
import { useSnackbar } from "notistack"; // 1. Importamos el hook

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Inicializamos el hook para las notificaciones
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
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
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
