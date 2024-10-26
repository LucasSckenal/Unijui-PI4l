import { useContext } from "react";
import { ThemeContext } from "../../Contexts/themeContext";

const ThemeSwap = ({ lightImage, darkImage }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div>
      <img
        src={isDarkMode ? darkImage : lightImage}
        alt={isDarkMode ? "Dark Mode Image" : "Light Mode Image"} 
      />
    </div>
  );
};

export default ThemeSwap;
