import styles from "./styles.module.scss";
import ChevronUp from "../../../assets/chevron-up-white.png";
import ChevronBottom from "../../../assets/chevron-bottom-white.png";
import { useEffect, useState } from "react";

const DropdownBtn = ({
  children,
  title,
  divisor,
  footer,
  iconType,
  width,
  height,
}) => {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState();

  useEffect(() => {
    if (iconType === "Plus") {
      setImage(Plus);
    } else {
      setImage(ChevronBottom);
    }
  }, []);

  function handleClick() {
    if (show) {
      setShow(false);
      if (iconType === "Plus") {
        setImage(Plus);
      } else {
        setImage(ChevronBottom);
      }
    } else {
      setShow(true);
      if (iconType === "Plus") {
        setImage(Minus);
      } else {
        setImage(ChevronUp);
      }
    }
  }

  const contentFooter = footer === "footer";
  return (
    <div
      className={styles.wrapper}
      style={{ width: `${width}`, height: `${height}` }}
    >
      <button onClick={handleClick} className={styles.button}>
        <span className={contentFooter ? styles.textFooter : ""}>{title}</span>
        <img src={image} alt="Dropdow Button" />
      </button>
      {show && (
        <div className={contentFooter ? styles.footer : styles.content}>
          {divisor && <div className={styles.separator}></div>}
          {children}
        </div>
      )}
    </div>
  );
};

export default DropdownBtn;
