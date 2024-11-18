import styles from "./styles.module.scss";
import ChevronUp from "../../../assets/chevron-up-white.png";
import ChevronBottom from "../../../assets/chevron-bottom-white.png";
import ChevronUpLight from "../../../assets/chevron-up.svg";
import ChevronBottomLight from "../../../assets/chevron-bottom.svg";
import ThemeSwap from "../../ThemeSwap/themeSwap";
import { useEffect, useState, useRef } from "react";

const DropdownBtn = ({
  children,
  title,
  divisor,
  footer,
  icon: Icon,
  width,
  height,
}) => {
  const [show, setShow] = useState(false);
  const contentRef = useRef(null);

  function handleClick() {
    setShow((prev) => !prev);

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
        <ThemeSwap
          lightImage={show ? ChevronUpLight : ChevronBottomLight}
          darkImage={show ? ChevronUp : ChevronBottom}
        />
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
