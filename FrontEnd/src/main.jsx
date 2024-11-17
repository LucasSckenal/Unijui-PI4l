import { StrictMode, useContext } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, ThemeContext } from "./Contexts/themeContext";
import Rotas from "./Routes/routes";
import "./global.scss";
import { ToastContainer } from "react-toastify";
import { DataProvider } from "./Contexts/DataContext";

const App = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Rotas />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <DataProvider>
          <App />
        </DataProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
