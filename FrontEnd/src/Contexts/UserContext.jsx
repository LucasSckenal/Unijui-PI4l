/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Configuração base para Axios
  const api = axios.create({
    baseURL: "http://localhost:3000",
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const response = await api.get("/users/me");
          setUser(response.data);
        } catch (error) {
          console.error("Erro ao carregar o usuário:", error.response?.data || error);
          localStorage.removeItem("authToken");
        }
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const register = async (data) => {
    try {
      const response = await api.post("/users/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data; // Retorna o usuário criado
    } catch (error) {
      console.error("Erro ao registrar usuário:", error.response?.data || error);
      throw error.response?.data || error;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await api.post("/users/login", credentials);
      const { user, authToken } = response.data;

      localStorage.setItem("authToken", authToken);
      setUser(user);
      return user;
    } catch (error) {
      console.error("Erro ao fazer login:", error.response?.data || error);
      throw error.response?.data || error;
    }
  };

  const updateUser = async (data, userId) => {
    try {
      const response = await api.put(`/users/${userId}/profile`, data);
      setUser(response.data);
      return response.data;
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
