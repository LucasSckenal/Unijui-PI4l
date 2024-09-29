import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Mainpage from "./Pages/Main/Mainpage";
import "./global.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Mainpage />
  </StrictMode>
);
