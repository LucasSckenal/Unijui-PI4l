import { useState } from "react";
import styles from "./styles.module.scss";
import RedirectionFrame from "../../Utilities/RedirectionFrame/redirectionFrame";
import { FaArrowRight } from "react-icons/fa";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


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

        <button  className={styles.btnAuth}>Entrar</button>

      </div>
       <RedirectionFrame icon={<FaArrowRight />} name={"Clique aqui para se registrar"} redirection={"/register"}/>
    </div>
  );
}

export default LoginForm;
