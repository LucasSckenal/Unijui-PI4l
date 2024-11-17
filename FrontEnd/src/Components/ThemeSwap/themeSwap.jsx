import { useContext } from "react";
import { ThemeContext } from "../../Contexts/themeContext";

const ThemeSwap = ({ lightImage, darkImage }) => {
  const { isDarkMode } = useContext(ThemeContext);

  const themeImage = isDarkMode ? darkImage : lightImage;

  if (typeof themeImage === "string") {
    return <img src={themeImage} alt={isDarkMode ? "Dark Mode" : "Light Mode"} />;
  }

  if (typeof themeImage === "object" && themeImage.component) {
    const { component: Component, props } = themeImage;
    return <Component {...props} />;
  }

  return null; 
};

export default ThemeSwap;
