import { PiSunFill, PiMoonFill } from "react-icons/pi";
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";

const DarkModeBtn = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    setIsDarkMode(currentTheme === "dark");
    document.body.setAttribute("data-theme", currentTheme || "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  return (
    <div>
      <button onClick={toggleTheme} className={styles.DarkModeBtn}>
        {isDarkMode ? <PiMoonFill size={24} /> : <PiSunFill size={24} />}
      </button>
    </div>
  );
};

export default DarkModeBtn;
