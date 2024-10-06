import DarkModeBtn from '../../Buttons/DarkModeBtn/DarkModeBtn';
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";  

const RedirectionFrame = ({ icon, name, redirection }) => {
  const navigate = useNavigate();  

  const onHandleRedirect = () => {
    navigate(redirection); 
  };

  return (
    <div className={styles.frame}>
      <button onClick={onHandleRedirect} className={styles.frameBtn}>
        {name}
        {icon}
      </button>
      <div className={styles.darkBtn}>
        <DarkModeBtn/>
      </div>
    </div>
  );
}

export default RedirectionFrame;
