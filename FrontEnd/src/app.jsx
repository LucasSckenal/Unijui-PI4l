import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import { ThemeContext } from "./Contexts/themeContext";
import Rotas from "./Routes/routes";

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

export default App;
