import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RegisterPage from "./Components/Auth/RegisterForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RegisterPage />
    </>
  );
}

export default App;
