import styles from "./styles.module.scss";
import lightImage from "../../../assets/LogoutBtnDark.png";
import darkImage from "../../../assets/LogoutBtn.png";
import ThemeSwap from "../../ThemeSwap/themeSwap";
import { AuthContext } from "../../../Contexts/UserContext";
import { useContext } from "react";

// eslint-disable-next-line react/prop-types
const LogoutBtn = ({ hasText = false, text = "Logout" }) => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
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
