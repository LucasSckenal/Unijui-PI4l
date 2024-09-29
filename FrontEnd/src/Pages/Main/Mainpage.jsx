import styles from "./style.module.scss";
import DarkModeBtn from "../../Components/DarkModeBtn/DarkModeBtn";

const Mainpage = () => {
  return (
    <main>
      <DarkModeBtn />
      <div className={styles.t1}></div>
      <div className={styles.t2}></div>
      <div className={styles.t3}></div>
      <div className={styles.t4}></div>
      <div className={styles.t5}></div>
      <div className={styles.t6}></div>
      <div className={styles.t7}></div>
      <div className={styles.t8}></div>
      <div className={styles.t9}></div>
    </main>
  );
};

export default Mainpage;
