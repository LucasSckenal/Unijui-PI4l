import { Navigate } from "react-router-dom";

const PriviteRoutes = ({ children }) => {
  const storageUser = localStorage.getItem("loggedInUser");

  if (!storageUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PriviteRoutes;
