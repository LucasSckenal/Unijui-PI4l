import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Mainpage from "../Pages/Main/Mainpage";
import Login from "../Pages/Auth/LoginPage";
import Register from "../Pages/Auth/RegisterPage";

const Rotas = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/" element={<PrivateRoutes> <Mainpage/> </PrivateRoutes>} />

      <Route path="/debug" element={<Mainpage />} />

    </Routes>
  );
};

export default Rotas;