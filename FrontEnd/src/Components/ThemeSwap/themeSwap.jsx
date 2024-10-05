import { useContext } from "react";
import { ThemeContext } from "../../Contexts/themeContext";
import styles from "./styles.module.scss";

const ThemeSwap = ({ lightImage, darkImage }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div>
      <img
        src={isDarkMode ? darkImage : lightImage}
        alt={isDarkMode ? "Dark Mode Image" : "Light Mode Image"} 
        className={styles.theme}
      />
    </div>
  );
};

export default ThemeSwap;
