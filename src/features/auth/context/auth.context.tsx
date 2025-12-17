import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import type { User } from "../types/userTypes";
import { logoutUserService } from "../services/authService";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Hooks nuevos
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

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

  // Logout local: Limpia estado, storage, muestra toast y redirige
  const localLogout = () => {
    setUser(null);
    localStorage.removeItem("user_data");

    // 1. TOAST DE DESPEDIDA
    enqueueSnackbar("Sesión cerrada. ¡Buen Camino!", { variant: "info" });

    // 2. Usamos navigate en lugar de window.location para mantener el toast visible
    navigate("/login");
  };

  const logout = async () => {
    try {
      await logoutUserService();
    } catch (error) {
      console.error("Error al cerrar sesión en el servidor:", error);
    } finally {
      // Siempre hacemos logout local, falle o no el servidor
      localLogout();
    }
  };

  // Manejamos el evento global (por si el token expira y axios nos echa)
  useEffect(() => {
    const handleForceLogout = () => {
      localLogout();
    };

    window.addEventListener("force-logout", handleForceLogout);
    return () => window.removeEventListener("force-logout", handleForceLogout);
  }, [navigate, enqueueSnackbar]); // Añadimos dependencias

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
