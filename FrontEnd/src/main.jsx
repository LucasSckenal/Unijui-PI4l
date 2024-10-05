import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./Contexts/themeContext";
import Rotas from "./Routes/routes";
import "./global.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Rotas />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);