import { useContext } from "react";
import { PiSunFill, PiMoonFill } from "react-icons/pi";
import { ThemeContext } from "../../../Contexts/themeContext";
import styles from "./styles.module.scss";

const DarkModeBtn = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className={styles.DarkModeBtn}>
      {isDarkMode ? <PiMoonFill size={24} color="#fff" /> : <PiSunFill size={24} />}
    </button>
  );
};

export default DarkModeBtn;
