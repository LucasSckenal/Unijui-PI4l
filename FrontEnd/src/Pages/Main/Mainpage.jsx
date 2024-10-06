import Header from "../../Components/Header/header.jsx";
import { FaRegCalendarAlt } from "react-icons/fa";
import styles from "./styles.module.scss";
import { useRef } from "react"

function Home() {
  const dateInputRef = useRef(null);

  const handleIconClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker(); 
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Header />

      <aside className={styles.lines}>
        <div className={styles.calendar}>
           <input
        type="date"
        className={styles.dateInput}
        ref={dateInputRef}
        style={{ display: 'none' }} 
      />
      <div onClick={handleIconClick} className={styles.calendarIcon} >
        <FaRegCalendarAlt size={50}/>
        <p>Calendário</p>
      </div>
    </div>
    <div className={styles.divider}></div>
        <div>
          <h2>27</h2>
          <p>Outubro</p>
        </div>
      </aside>
    </div>
  );
}

export default Home;
