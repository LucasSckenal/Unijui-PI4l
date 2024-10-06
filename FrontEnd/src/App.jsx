import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginForm from "./Components/Auth/LoginForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <LoginForm />
    </>
  );
}

export default App;
