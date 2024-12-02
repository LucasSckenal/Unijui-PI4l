import { useState, useContext } from "react";
import styles from "./styles.module.scss";
import RedirectionFrame from "../../Utilities/RedirectionFrame/redirectionFrame";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Importa a função toast
import "react-toastify/dist/ReactToastify.css"; // Importa os estilos padrão do Toastify
import { AuthContext } from "../../../Contexts/UserContext"; // Importa o contexto de autenticação

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Obtém a função de login do contexto

  const handleLogin = async () => {
    toast.dismiss();
  
    if (!username || !password) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }
  
    try {
      const user = await login({ email: username, password });
      console.log(user);

      if (user) {
        toast.success("Login bem-sucedido!");
        navigate("/"); // Redireciona apenas se o login for bem-sucedido
      } else {
        toast.error("Senha incorreta.")
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
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
            <label>E-mail</label>
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
        <button onClick={handleLogin} className={styles.btnAuth}>
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
