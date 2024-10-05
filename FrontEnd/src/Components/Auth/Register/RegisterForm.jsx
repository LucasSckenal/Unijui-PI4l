import { useState } from "react";
import styles from "./styles.module.scss";
import { FaArrowRight } from "react-icons/fa";
import RedirectionFrame from "../../Utilities/RedirectionFrame/redirectionFrame";

function RegisterForm() {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");


   const handleSubmit = (e) => {
     e.preventDefault();
    
     console.log("Registered:", { name, email, password });
   };

   return (
      <div className={styles.form}>
        <div className={styles.innerForm}>
        <h1>Crie uma conta</h1>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.registerInput}>
            <input
              type="text"
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>Nome:</label>
          </div>
          
          <div className={styles.registerInput}>
            <input
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>E-Mail:</label>
          </div>

          <div className={styles.registerInput}>
            <input
              type="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Senha:</label>
          </div>

          <div className={styles.registerInput}>
            <input
              type="password"
              placeholder=" "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label>Confirmar senha:</label>
          </div>
          
          <button type="submit" className={styles.btnAuth}>Registrar</button>
        </form>
        </div>
        <RedirectionFrame icon={<FaArrowRight/>} name={"Clique aqui para se logar"} redirection={"/login"}/>
      </div>
   );
}

export default RegisterForm;
