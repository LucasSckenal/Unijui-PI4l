import styles from "./styles.module.scss";
import ChevronUp from "../../../assets/chevron-up-white.png";
import ChevronBottom from "../../../assets/chevron-bottom-white.png";
import { useEffect, useState, useRef } from "react";

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
  const contentRef = useRef(null); // Referência para o conteúdo

  useEffect(() => {
    if (iconType === "Plus") {
      setImage(Plus);
    } else {
      setImage(ChevronBottom);
    }
  }, []);

  function handleClick() {
    setShow((prev) => !prev); // Alterna o estado de show
    if (iconType === "Plus") {
      setImage((prev) => (prev === Plus ? Minus : Plus));
    } else {
      setImage((prev) => (prev === ChevronBottom ? ChevronUp : ChevronBottom));
    }

    if (!show && contentRef.current) {
      // Rola a tela para o conteúdo se estiver sendo aberto
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
        <span className={contentFooter ? styles.textFooter : ""}>{title}</span>
        <img src={image} alt="Dropdown Button" />
      </button>
      <div

        className={`${styles.content} ${show ? styles.show : styles.hide}`}
        style={{ paddingTop: "20px" }}
      >
        <div
          ref={contentRef} // Adiciona a referência aqui
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default DropdownBtn;
