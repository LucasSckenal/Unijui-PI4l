import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifica se há um token salvo e carrega o usuário
    const token = localStorage.getItem("authToken");
    if (token) {
      axios
        .get("http://localhost:3000/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          localStorage.removeItem("authToken");
        });
    }
    setLoading(false);
  }, []);

  const register = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/register",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        credentials
      );
      const { token, user } = response.data;
      localStorage.setItem("authToken", token);
      setUser(user);
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateUser = async (data) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put("http://localhost:3000/users/me", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
