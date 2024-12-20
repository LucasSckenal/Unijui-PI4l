import { useState, useContext } from "react";
import styles from "./styles.module.scss";
import { FaArrowRight } from "react-icons/fa";
import RedirectionFrame from "../../Utilities/RedirectionFrame/redirectionFrame";
import { toast } from "react-toastify";
import user from "../../../assets/UserDefault.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/UserContext";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [imageAvatar, setImageAvatar] = useState(null);
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  function handleFile(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        setImageAvatar(image);
        setAvatar(URL.createObjectURL(image));
      } else {
        toast.warning("Faça upload de uma imagem PNG ou JPEG");
        setImageAvatar(null);
        return;
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Senhas não batem");
      return;
    }

    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;

    if (!regex.test(password)) {
      toast.error(
        "A senha deve ter pelo menos 5 caracteres, incluindo letras, números e caracteres especiais."
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      if (imageAvatar) formData.append("avatar", imageAvatar);

      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Password:", password);
      
      await register(formData);

      toast.success("Registro realizado com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error("Erro no registro:", error);
      toast.error(
        error?.response?.data?.message || "Erro ao registrar o usuário."
      );
    }
  };

  return (
    <div className={styles.form}>
      <div className={styles.innerForm}>
        <h1>Crie uma conta</h1>

        <div className={styles.avatar}>
          {avatar === null ? (
            <img
              src={user}
              alt="User Avatar"
              onClick={() => document.getElementById("fileInput").click()}
            />
          ) : (
            <img
              src={avatar}
              alt="User Avatar"
              onClick={() => document.getElementById("fileInput").click()}
            />
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
              pattern="[A-Za-z]+"
              title="Por favor, insira apenas letras."
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

          <button type="submit" className={styles.btnAuth}>
            Registrar
          </button>
        </form>
      </div>
      <RedirectionFrame
        icon={<FaArrowRight />}
        name={"Clique aqui para se logar"}
        redirection={"/login"}
      />
    </div>
  );
}

export default RegisterForm;
