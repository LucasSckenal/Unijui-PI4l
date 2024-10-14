import { useState } from "react";
import styles from "./styles.module.scss";
import RedirectionFrame from "../../Utilities/RedirectionFrame/redirectionFrame";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Importa a função toast
import "react-toastify/dist/ReactToastify.css"; // Importa os estilos padrão do Toastify

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginRedirect = () => {
    const localUser = localStorage.getItem("nome");
    const localPassword = localStorage.getItem("password");

    // Limpa qualquer erro anterior
    toast.dismiss();

    if (!username || !password) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    if (username === localUser && password === localPassword) {
      localStorage.setItem("loggedInUser", "loggedInUser");
      toast.success("Login bem-sucedido!"); // Notificação de sucesso
      navigate("/");
    } else {
      toast.error("Usuário ou senha incorretos.");
    }
  };

  return (
    <div className={styles.form}>
      <div className={styles.innerForm}>
        <h1>Faça seu login</h1>
        <div className={styles.loginInput}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder=" "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Usuário</label>
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Senha</label>
          </div>
        </div>
        <button onClick={loginRedirect} className={styles.btnAuth}>
          Entrar
        </button>
      </div>
      <RedirectionFrame
        icon={<FaArrowRight />}
        name={"Clique aqui para se registrar"}
        redirection={"/register"}
      />
    </div>
  );
}

export default LoginForm;
