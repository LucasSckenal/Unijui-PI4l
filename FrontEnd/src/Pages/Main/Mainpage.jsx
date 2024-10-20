import { useRef, useState, useEffect } from "react";
import Header from "../../Components/Header/header.jsx";
import { FaRegCalendarAlt } from "react-icons/fa";
import styles from "./styles.module.scss";
import Times from "../../Components/Time/time.jsx";
import GraphicsBtn from "../../Components/Buttons/GraphicsBtn/GraphicsBtn.jsx";
import GraphicsOptions from "../../Components/Buttons/graphicOptionsBtn/GraphicOptionsBtn.jsx";
import GraphicContainer from "../../Components/GraphicContainer/GraphicContainer.jsx";
import Divider from "../../Components/Utilities/Divider/Divider.jsx";

function Home() {
  const [selectedDate, setSelectedDate] = useState("");
  const [sensors, setSensors] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeBtn, setActiveBtn] = useState(null);
  const [activeOptions, setActiveOptions] = useState([]);
  const [line, setLine] = useState("");
  const [visibleLines, setVisibleLines] = useState({
    line1: false,
    line2: false,
    line3: false,
  });

  const GraphsBtns = [
    {
      name: "Vento",
      id: 1,
      options: [
        { id: "1", label: "Avg. Wind Speed" },
        { id: "2", label: "Gust Wind Speed" },
        { id: "3", label: "Teste teste" },
      ],
    },
    {
      name: "Temperatura",
      id: 2,
      options: [
        { id: "1", label: "Temperatura Ext" },
        { id: "2", label: "Temperatura Int" },
        { id: "3", label: "Opção 3" },
      ],
    },
    {
      name: "Diversos",
      id: 3,
      options: [
        { id: "1", label: "Pressão atmosférica" },
        { id: "2", label: "Radiação solar" },
      ],
    },
  ];

  const lineDatas = [
    {
      name: "Vento",
      data: [
        [10, 20, 30],
        [15, 25, 30],
        [50, 15, 20, 25, 40, 50],
      ],
    },
    {
      name: "Temperatura",
      data: [
        [40, 30, 20],
        [35, 50, 100],
        [60, 70],
      ],
    },
    {
      name: "Diversos",
      data: [
        [20, 30],
        [22, 28, 24],
      ],
    },
  ];

  const dateInputRef = useRef(null);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setSelectedDate(formattedDate);
  }, []);

  const mockUser = {
    name: localStorage.getItem("nome"),
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
      const date = selectedDate
        ? new Date(selectedDate + "T00:00:00Z")
        : new Date();
      setCurrentDate(date);
    };

    updateDate();
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

  const handleButtonClick = (buttonName) => {
    if (activeBtn === buttonName) {
      setActiveBtn(null);
      setActiveOptions([]);
      setVisibleLines({ line1: false, line2: false, line3: false });
      setLine("");
    } else {
      setActiveBtn(buttonName);
      setActiveOptions([]); // Limpa as opções ativas
      setVisibleLines({ line1: false, line2: false, line3: false }); // Limpa a visibilidade das linhas
      setLine(buttonName); // Define a linha ativa
    }
  };

  const toggleLineVisibility = (optionId, shouldActivate) => {
    if (activeBtn) {
      setActiveOptions((prev) => {
        if (shouldActivate) {
          return [...prev, optionId];
        } else {
          return prev.filter((id) => id !== optionId);
        }
      });

      // Atualiza a visibilidade das linhas com base no activeBtn
      setVisibleLines((prev) => ({
        ...prev,
        [`line${optionId}`]: shouldActivate,
      }));
    }
  };

  const day = currentDate ? currentDate.getUTCDate() : "";
  const month = currentDate
    ? currentDate.toLocaleString("default", { month: "long", timeZone: "UTC" })
    : "";

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
            <Divider width={"90px"} />
            <div className={styles.date}>
              <h2>{day}</h2>
              <p>{month}</p>
            </div>
            <Divider width={90} />
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
            <Divider width={"90px"} />
            {GraphsBtns.map(({ name, options }) => (
              <div key={name}>
                <GraphicsBtn
                  name={name}
                  isActive={activeBtn === name}
                  onClick={() => handleButtonClick(name)}
                />
                {activeBtn === name && (
                  <GraphicsOptions
                    options={options}
                    isActiveOptions={activeOptions}
                    onToggle={toggleLineVisibility}
                  />
                )}
              </div>
            ))}
            <Divider width={"90px"} />
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
            <p>
              Dê uma olhada nos gráficos atualizados constantemente, abaixo.
            </p>
            <GraphicContainer
              visibleLines={visibleLines}
              line={line}
              lineDatas={lineDatas}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
