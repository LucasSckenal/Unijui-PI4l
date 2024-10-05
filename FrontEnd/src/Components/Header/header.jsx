import Logo from "../../Components/Logo/logo";
import styles from "./styles.module.scss";
import Times from "../Time/time"
import LogoutBtn from "../Buttons/LogoutBtn/Logout";
import DarkModeBtn from "../Buttons/DarkModeBtn/DarkModeBtn";

const Header = () => {
  return (
        <header className={styles.topBar}>
        <div className={styles.banner}>
            <Logo/>
            <div className={styles.innerBanner}>
              <h1>Weekly Planner</h1>
              <p>Use this planner to organize your daily issues.</p>
              </div>
              <div className={styles.darkBtn}>
                <DarkModeBtn />
              </div>
        </div>
        <div className={styles.Timer}>
            <Times />
        </div>
        <div className={styles.logoutBtn}>
            <LogoutBtn />
        </div>
        </header>
  );
};

export default Header;