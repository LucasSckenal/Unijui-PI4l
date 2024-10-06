import { useState } from "react";
import styles from "./styles.module.scss";
import { FaArrowRight } from "react-icons/fa";
import RedirectionFrame from "../../Utilities/RedirectionFrame/redirectionFrame";
import { toast } from "react-toastify";
import user from "../../../assets/UserDefault.png";

function RegisterForm() {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [avatar, setAvatar] = useState(null);
   const [imageAvatar, setImageAvatar] = useState(null);

   function handleFile(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        setImageAvatar(image);
        setAvatar(URL.createObjectURL(image));
      } else {
        toast.warning("Upload a png image");
        setImageAvatar(null);
        return;
      }
    }
  }

   const handleSubmit = (e) => {
     e.preventDefault();
    
     console.log("Registered:", { name, email, password });
   };

   return (
      <div className={styles.form}>
        <div className={styles.innerForm}>
        <h1>Crie uma conta</h1>
       
        <div className={styles.avatar}>
          {avatar === null ? (
              <img src={user} alt="" onClick={() => document.getElementById("fileInput").click()} />
            ) : (
                <img src={avatar} alt="" onClick={() => document.getElementById("fileInput").click()} />
            )}
            <input 
                id="fileInput"
                type="file" 
                accept="image/*" 
                onChange={handleFile} 
                style={{ display: "none" }} 
            />
         </div>
          
          
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
