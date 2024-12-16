import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Inicializa o estado do usuário com os dados armazenados no localStorage
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  // Configura a instância do axios
  const api = axios.create({
    baseURL: "http://localhost:3000",
  });

  // Adiciona o token no cabeçalho Authorization de todas as requisições
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
          // Tenta carregar os dados do usuário
          const response = await api.get("/users/me");
          setUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
        } catch (error) {
          console.error("Erro ao carregar o usuário:", error.response?.data || error);
          // Apenas limpa o localStorage se o erro for por token inválido
          if (error.response?.status === 401 || error.response?.status === 403) {
            alert("Sessão expirada. Faça login novamente.");
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
          }
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
      return response.data;
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
      localStorage.setItem("user", JSON.stringify(user));
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
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error.response?.data || error);
      throw error.response?.data || error;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
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
