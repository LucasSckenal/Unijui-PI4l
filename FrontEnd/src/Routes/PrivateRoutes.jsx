import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const storageUser = localStorage.getItem("loggedInUser");

  if (!storageUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoutes;