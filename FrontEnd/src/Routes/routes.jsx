import { Routes, Route } from "react-router-dom";
import PriviteRoutes from "./PriviteRoutes";
import Mainpage from "../Pages/Main/Mainpage";
import Login from "../Pages/Auth/LoginPage";
import Register from "../Pages/Auth/RegisterPage";

const Rotas = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/" element={<PriviteRoutes> <Mainpage/> </PriviteRoutes>} />
      </Routes>
  );
};

export default Rotas;
