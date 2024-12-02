import styles from "./styles.module.scss";
import lightImage from "../../../assets/LogoutBtnDark.png";
import darkImage from "../../../assets/LogoutBtn.png";
import ThemeSwap from "../../ThemeSwap/themeSwap";
import { toast } from "react-toastify"; // Importa o toast

// eslint-disable-next-line react/prop-types
const LogoutBtn = ({ hasText = false, text = "Logout" }) => {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    toast.success("Logout realizado com sucesso!"); // Adiciona a notificação
    window.location.reload();
  };

  return (
    <button onClick={handleLogout} className={styles.button}>
      {hasText && <p>{text}</p>}
      <ThemeSwap darkImage={darkImage} lightImage={lightImage} />
    </button>
  );
};

export default LogoutBtn;
