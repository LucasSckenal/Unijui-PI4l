import { useState } from "react";
import "./App.css";
import RegisterPage from "./Components/Auth/RegisterForm";
import LoginPage from "./Pages/Auth/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
