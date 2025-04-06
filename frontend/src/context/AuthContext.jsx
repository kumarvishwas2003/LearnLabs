import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.user);
      } catch (error) {
        localStorage.removeItem("token");
      } finally {
        setLoading(false); // Make sure to always set loading to false
      }
    };

    checkAuth();
  }, []);

const login = (token, userData) => {
  localStorage.setItem("token", token);
  setUser(userData); // Make sure this includes the updated role
  navigate("/"); // Or wherever you want to redirect after login
};

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children} {/* Only render children when not loading */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
