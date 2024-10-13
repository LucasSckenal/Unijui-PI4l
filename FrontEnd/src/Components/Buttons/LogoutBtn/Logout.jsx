import styles from "./styles.module.scss";
import lightImage from "../../../assets/LogoutBtnDark.png";
import darkImage from "../../../assets/LogoutBtn.png";
import ThemeSwap from "../../ThemeSwap/themeSwap";

const LogoutBtn = ({ hasText = false, text = "Logout" }) => {
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
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
