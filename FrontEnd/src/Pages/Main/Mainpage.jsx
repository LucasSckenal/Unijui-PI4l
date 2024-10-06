import Header from "../../Components/Header/header.jsx";
import { FaRegCalendarAlt } from "react-icons/fa";
import styles from "./styles.module.scss";
import { useRef, useState, useEffect } from "react";
import Times from "../../Components/Time/time.jsx";

function Home() {
  const [selectedDate, setSelectedDate] = useState("");
  const [sensors, setSensors] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState("");

  const dateInputRef = useRef(null);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setSelectedDate(formattedDate);
  }, []);

  const handleIconClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
  };

  const handleChange = (event) => {
    setSelectedSensor(event.target.value);
  };

  const date = selectedDate ? new Date(selectedDate + "T00:00:00") : "";
  const day = date ? date.getDate() : "";
  const month = date ? date.toLocaleString("default", { month: "long" }) : "";

  return (
    <div className={styles.pageContainer}>
      <Header />

      <aside className={styles.lines}>
        <div className={styles.top}>
          <div className={styles.calendar}>
            <input
              type="date"
              ref={dateInputRef}
              style={{ display: "none" }}
              onChange={handleDateChange}
              defaultValue={selectedDate}
            />
            <div onClick={handleIconClick}>
              <FaRegCalendarAlt size={50} />
              <p>Calendário</p>
            </div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.date}>
            <h2>{day}</h2>
            <p>{month}</p>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.Sensor}>
            <select
              id="sensorSelect"
              value={selectedSensor}
              onChange={handleChange}
              className={styles.selectSensor}
            >
              <option value="">Selecione um sensor ▼</option>
              {sensors.map((sensor) => (
                <option key={sensor.id} value={sensor.id}>
                  {sensor.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.report}>
            <p>Mostrar relatorios</p>
            <input type="checkbox" name="" id="" />
          </div>
          <div className={styles.grafics}>
            <p>Mostrar Graficos</p>
            <input type="checkbox" name="" id="" />
          </div>
          <div className={styles.divider}></div>
        </div>
        <div className={styles.Timer}>
          <Times />
        </div>
      </aside>
    </div>
  );
}

export default Home;