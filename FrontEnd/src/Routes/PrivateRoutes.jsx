/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const authToken = localStorage.getItem("authToken"); // Checa o token de autenticação

  if (!authToken) {
    return <Navigate to="/login" />; // Redireciona para o login se não houver token
  }

  return children;
};

export default PrivateRoutes;
