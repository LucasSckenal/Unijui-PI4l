import Logo from "../../Components/Logo/logo";
import styles from "./styles.module.scss";
import LogoutBtn from "../Buttons/LogoutBtn/Logout";
import DarkModeBtn from "../Buttons/DarkModeBtn/DarkModeBtn";

const Header = () => {
  return (
        <header className={styles.topBar}>
        <div className={styles.banner}>
          <div className={styles.logoIcon}>
              <Logo/>
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
            <LogoutBtn />
        </div>
        </header>
  );
};

export default Header;