import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { authApi } from "../lib/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  // "checking" until /auth/me answers, so protected pages don't flash the login screen.
  const [status, setStatus] = useState("checking");

  const refresh = useCallback(async () => {
    try {
      const { admin } = await authApi.me();
      setAdmin(admin);
      setStatus("authenticated");
    } catch {
      setAdmin(null);
      setStatus("anonymous");
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = async (email, password) => {
    const { admin } = await authApi.login(email, password);
    setAdmin(admin);
    setStatus("authenticated");
    return admin;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      setAdmin(null);
      setStatus("anonymous");
    }
  };

  // Called when any API call returns 401 (cookie expired / revoked).
  const sessionExpired = useCallback(() => {
    setAdmin(null);
    setStatus("anonymous");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        admin,
        setAdmin,
        status,
        login,
        logout,
        refresh,
        sessionExpired,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
