import ThemeSwap from "../../ThemeSwap/themeSwap";
import styles from "./styles.module.scss";

function SmallContainer({ lastValue, light, dark, complement }) {
  return (
    <div className={styles.Container}>
      <div className={styles.innerC}>
        <ThemeSwap darkImage={light} lightImage={dark} />
        <span>
          {lastValue}
          {complement}
        </span>
      </div>
    </div>
  );
}

export default SmallContainer;
