import styles from "../../../components/header/styles.module.scss";
import lightImage from "../../../assets/LogoutBtnDark.png";
import darkImage from "../../../assets/LogoutBtn.png";
import ThemeSwap from "../../ThemeSwap/themeSwap";
//? botao de logout
const LogoutBtn = () => {
  const handleLogout = () => {
    localStorage.removeItem("loggedUsers");
    window.location.reload();
  };

  return (
    <button onClick={handleLogout} className={styles.button}>
     <ThemeSwap darkImage={darkImage} lightImage={lightImage}/>
    </button>
  );
};

export default LogoutBtn;