import styles from "./styles.module.scss";
import ChevronUp from "../../../assets/chevron-up-white.png";
import ChevronBottom from "../../../assets/chevron-bottom-white.png";
import { useEffect, useState, useRef } from "react";

const DropdownBtn = ({
  children,
  title,
  divisor,
  footer,
  icon: Icon,
  iconType,
  width,
  height,
}) => {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState();
  const contentRef = useRef(null);
  useEffect(() => {
    if (iconType === "Plus") {
      setImage(Plus);
    } else {
      setImage(ChevronBottom);
    }
  }, []);

  function handleClick() {
    setShow((prev) => !prev);
    if (iconType === "Plus") {
      setImage((prev) => (prev === Plus ? Minus : Plus));
    } else {
      setImage((prev) => (prev === ChevronBottom ? ChevronUp : ChevronBottom));
    }

    if (!show && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  const contentFooter = footer === "footer";
  return (
    <div
      className={styles.wrapper}
      style={{ width: `${width}`, height: `${height}` }}
    >
      <button onClick={handleClick} className={styles.button}>
        <span className={contentFooter ? styles.textFooter : ""}>
          {title} {Icon && <Icon />}{" "}
        </span>
        <img src={image} alt="Dropdown Button" />
      </button>
      <div
        className={`${styles.content} ${show ? styles.show : styles.hide}`}
        style={{ paddingTop: "20px" }}
      >
        <div ref={contentRef}>{children}</div>
      </div>
    </div>
  );
};

export default DropdownBtn;
