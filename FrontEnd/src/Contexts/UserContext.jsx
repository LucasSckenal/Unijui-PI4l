import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const response = await axios.get("http://localhost:3000/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Erro ao carregar o usuário:", error);
          localStorage.removeItem("authToken");
        }
      }
      setLoading(false);
    };
    checkUser();
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
      return response.data; // Retorna o usuário criado
    } catch (error) {
      console.error("Erro ao registrar usuário:", error.response?.data || error);
      throw error.response?.data || error;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        credentials
      );
      const { token, user } = response.data;

      // Salva o token e define o usuário logado
      localStorage.setItem("authToken", token);
      setUser(user);
      return user;
    } catch (error) {
      console.error("Erro ao fazer login:", error.response?.data || error);
      throw error.response?.data || error;
    }
  };

  const updateUser = async (data) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put("http://localhost:3000/users/me", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      return response.data; // Retorna os dados atualizados
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error.response?.data || error);
      throw error.response?.data || error;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
