import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("cf_token"));
  const [loading, setLoading] = useState(true);

  // 🔥 Load user on refresh
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await authAPI.getMe(token);
        setUser(res.data.data.user);
      } catch (err) {
        console.error("Auth error:", err);
        setUser(null);
        setToken(null);
        localStorage.removeItem("cf_token");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  // 🔥 LOGIN
  const login = async (email, password) => {
    const res = await authAPI.login({ email, password });

    const { user, token } = res.data.data;

    setUser(user);
    setToken(token);
    localStorage.setItem("cf_token", token);

    return user;
  };

  // 🔥 SIGNUP
  const signup = async (name, email, password) => {
    const res = await authAPI.signup({ name, email, password });

    const { user, token } = res.data.data;

    setUser(user);
    setToken(token);
    localStorage.setItem("cf_token", token);

    return user;
  };

  // 🔥 LOGOUT
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("cf_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);