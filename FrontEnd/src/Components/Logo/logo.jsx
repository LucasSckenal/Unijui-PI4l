import lightImage from "../../assets/Logo-4L.png";
import darkImage from "../../assets/Logo-4L-black.png";
import ThemeSwap from "../ThemeSwap/themeSwap";

const Logo = () => {

  return (
    <div>
     <ThemeSwap darkImage={darkImage} lightImage={lightImage} />
    </div>
  );
};

export default Logo;
