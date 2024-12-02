import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./Contexts/themeContext";
import { SensorsProvider } from './Contexts/SensorsContext';
import { AuthProvider } from "./Contexts/UserContext";
import App from "./app";
import "./global.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <SensorsProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </SensorsProvider>
    </ThemeProvider>
  </StrictMode>
);
