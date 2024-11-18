import Logo from "../../Components/Logo/logo";
import styles from "./styles.module.scss";
import DarkModeBtn from "../Buttons/DarkModeBtn/DarkModeBtn";
import ProfileBtn from "../Buttons/ProfileBtn/ProfileBtn";

const Header = () => {
  return (
    <header className={styles.topBar}>
      <div className={styles.banner}>
        <div className={styles.logoIcon}>
          <Logo />
        </div>
        <div className={styles.innerBanner}>
          <h1>Dashboard</h1>
          <p>Projeto Integrador 2 - Grupo 5</p>
        </div>
        <div className={styles.darkBtn}>
          <DarkModeBtn />
        </div>
      </div>
      <div className={styles.logoutBtn}>
        <ProfileBtn />
      </div>
    </header>
  );
};

export default Header;
