import { useRef, useState, useEffect } from "react";
import Header from "../../Components/Header/header.jsx";
import { FaRegCalendarAlt } from "react-icons/fa";
import styles from "./styles.module.scss";
import Times from "../../Components/Time/time.jsx";
import GraphicsBtn from "../../Components/Buttons/GraphicsBtn/GraphicsBtn.jsx";
import GraphicContainer from "../../Components/GraphicContainer/GraphicContainer.jsx";

function Home() {
  const [selectedDate, setSelectedDate] = useState("");
  const [sensors, setSensors] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());

  const dateInputRef = useRef(null);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setSelectedDate(formattedDate);
  }, []);

  const mockUser = {
    name: "Teste user",
  };

  useEffect(() => {
    const mockSensors = [
      { id: 1, name: "Sensor A" },
      { id: 2, name: "Sensor B" },
      { id: 3, name: "Sensor C" },
    ];
    setSensors(mockSensors);
  }, []);

  useEffect(() => {
    const updateDate = () => {
      // Se selectedDate não estiver vazio, use-o; caso contrário, use a data atual
      const date = selectedDate ? new Date(selectedDate + 'T00:00:00Z') : new Date();
      setCurrentDate(date);
    };

    updateDate(); // Atualiza a data inicialmente

    const intervalId = setInterval(updateDate, 1000);
    return () => clearInterval(intervalId);
  }, [selectedDate]);

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

  const day = currentDate ? currentDate.getUTCDate() : ""; 
  const month = currentDate ? currentDate.toLocaleString("default", { month: "long", timeZone: 'UTC' }) : ""; 

  const [visibleLines, setVisibleLines] = useState({
    line1: true,
    line2: true,
    line3: true,
  });

  const toggleLine = (lineKey) => {
    setVisibleLines((prev) => ({
      ...prev,
      [lineKey]: !prev[lineKey],
    }));
  };

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div style={{ display: "flex", flexDirection: "row", gap: "3.2%" }}>
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
                <option value="" className={styles.options}>
                  Selecione um sensor ▼
                </option>
                {sensors.map((sensor) => (
                  <option
                    key={sensor.id}
                    value={sensor.id}
                    className={styles.options}
                  >
                    {sensor.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.divider}></div>
            <GraphicsBtn name="Linha 1" onClick={() => toggleLine("line1")} />
            <GraphicsBtn name="Linha 2" onClick={() => toggleLine("line2")} />
            <GraphicsBtn name="Linha 3" onClick={() => toggleLine("line3")} />
            <div className={styles.divider}></div>
          </div>
          <div className={styles.Timer}>
            <Times />
          </div>
        </aside>
        <section className={styles.Home}>
          <div className={styles.greetings}>
            <h1>
              Bem-vindo de volta, <span>{mockUser.name}</span>
            </h1>
            <p>Dê uma olhada nos gráficos atualizados constantemente, abaixo.</p>
            <GraphicContainer visibleLines={visibleLines} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
