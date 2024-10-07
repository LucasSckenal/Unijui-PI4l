import { useRef, useState, useEffect } from "react";
import Header from "../../Components/Header/header.jsx";
import { FaRegCalendarAlt } from "react-icons/fa";
import styles from "./styles.module.scss";
import Times from "../../Components/Time/time.jsx";
import DropdownBtn from "../../Components/Buttons/DropDownBtn/dropDownBtn.jsx";
import HorizontalBarGraph from "../../Components/Graphs/HorizontalBarGraph/HorizontalBarGraph.jsx";
import PizzaGraph from "../../Components/Graphs/PizzaGraph/PizzaGraph.jsx";
import LineGraph from "../../Components/Graphs/LineGraph/LineGraph.jsx";
import temp from "../../assets/thermometer-temperature.svg";

function Home() {
  const [selectedDate, setSelectedDate] = useState("");
  const [sensors, setSensors] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState("");
  const [showReports, setShowReports] = useState(true);
  const [showGraphs, setShowGraphs] = useState(true);

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

  const toggleReports = () => {
    setShowReports((prev) => !prev);
  };

  const toggleGraphs = () => {
    setShowGraphs((prev) => !prev);
  };

  const avatar = localStorage.getItem("imagem");

  const dataPizza = [
    { value: 40, color: "#FA3E3E" },
    { value: 30, color: "#0056b3" },
    { value: 20, color: "#3C57C2" },
    { value: 10, color: "#3CC2AC" },
  ];

  const dataLine = [35, 30, 50, 70, 90, 80, 60, 40, 80, 50];

  const date = selectedDate ? new Date(selectedDate + "T00:00:00") : "";
  const day = date ? date.getDate() : "";
  const month = date ? date.toLocaleString("default", { month: "long" }) : "";

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div style={{ display: "flex", flexDirection: "row", gap: "4rem" }}>
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
            <div className={styles.reportInputs} onClick={toggleReports}>
              <p>Mostrar Relatórios</p>
              <div
                className={
                  showReports ? styles.toggleChecked : styles.toggleUnchecked
                }
              >
                <div className={styles.toggleBall}></div>
              </div>
            </div>
            <div className={styles.graphsInputs} onClick={toggleGraphs}>
              <p>Mostrar Gráficos</p>
              <div
                className={
                  showGraphs ? styles.toggleChecked : styles.toggleUnchecked
                }
              >
                <div className={styles.toggleBall}></div>
              </div>
            </div>
            <div className={styles.divider}></div>
          </div>
          <div className={styles.Timer}>
            <Times />
          </div>
        </aside>
        <section className={styles.Home}>
          <div className={styles.greetings}>
            <h1>
              Welcome back, <span>{mockUser.name}</span>
            </h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. </p>
          </div>
          <div className={styles.graphs}>
            <div className={styles.graphsTop}>
              <div className={styles.MainGraph}>
                <p>Graficos Principal</p>

                <LineGraph
                  data={dataLine}
                  width={1250}
                  height={290}
                  strokeColor="#3C57C2"
                  fillColor="rgba(16, 51, 207, 0.2)"
                  strokeWidth={3}
                />
              </div>
              <div className={styles.tempContainer}>
                <div className={styles.TempGraph}>
                  <p>Graficos Temperatura</p>
                  <div className={styles.temp}>
                    <img src={temp} alt="" />
                    <span>19ºC</span>
                  </div>
                </div>
                <div className={styles.TempIntGraph}>
                  <p>Graficos Temperatura interna</p>
                  <div className={styles.temp}>
                    <img src={temp} alt="" />
                    <span>22ºC</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.graphsBot}>
              <div className={styles.graphPizza}>
                <p>Gráfico de Pizza</p>

                <PizzaGraph data={dataPizza} size={250} strokeWidth={60} />
              </div>
              <div className={styles.graphBar}>
                <p>Gráfico de Barras</p>
                <HorizontalBarGraph></HorizontalBarGraph>
              </div>

              <div className={styles.dropDownBtns}>
                <p>Graficos maneiros</p>
                <DropdownBtn title="Average Wind" width={"230px"}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Molestiae, aut nam soluta libero ut quidem voluptatum nostrum
                  atque voluptatibus quisquam quam modi possimus unde deserunt
                  sed error similique fugiat! Rem.
                </DropdownBtn>
                <DropdownBtn title="Average Wind" width={"230px"}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Molestiae, aut nam soluta libero ut quidem voluptatum nostrum
                  atque voluptatibus quisquam quam modi possimus unde deserunt
                  sed error similique fugiat! Rem.
                </DropdownBtn>
                <DropdownBtn title="Average Wind" width={"230px"}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Molestiae, aut nam soluta libero ut quidem voluptatum nostrum
                  atque voluptatibus quisquam quam modi possimus unde deserunt
                  sed error similique fugiat! Rem.
                </DropdownBtn>
              </div>
            </div>
            <div className={styles.dropDownBtnsBot}>
              <DropdownBtn title="Average Wind" width={"504px"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestiae, aut nam soluta libero ut quidem voluptatum nostrum
                atque voluptatibus quisquam quam modi possimus unde deserunt sed
                error similique fugiat! Rem.
              </DropdownBtn>
              <DropdownBtn title="Average Wind" width={"504px"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestiae, aut nam soluta libero ut quidem voluptatum nostrum
                atque voluptatibus quisquam quam modi possimus unde deserunt sed
                error similique fugiat! Rem.
              </DropdownBtn>
              <DropdownBtn title="Average Wind" width={"504px"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestiae, aut nam soluta libero ut quidem voluptatum nostrum
                atque voluptatibus quisquam quam modi possimus unde deserunt sed
                error similique fugiat! Rem.
              </DropdownBtn>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
