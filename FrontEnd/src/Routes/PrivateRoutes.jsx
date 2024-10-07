import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  // quando o usuário logar precisar ser atribuido no loggedInUser
  const storageUser = localStorage.getItem("loggedInUser");
  if (!storageUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoutes;