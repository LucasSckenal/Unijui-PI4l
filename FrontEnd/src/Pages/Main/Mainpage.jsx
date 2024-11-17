import { useRef, useState, useEffect } from "react";
import Header from "../../Components/Header/header.jsx";
import { FaRegCalendarAlt } from "react-icons/fa";
import styles from "./styles.module.scss";
import Times from "../../Components/Time/time.jsx";
import GraphicsBtn from "../../Components/Buttons/GraphicsBtn/GraphicsBtn.jsx";
import GraphicsOptions from "../../Components/Buttons/graphicOptionsBtn/GraphicOptionsBtn.jsx";
import GraphicContainer from "../../Components/GraphicContainer/GraphicContainer.jsx";
import Divider from "../../Components/Utilities/Divider/Divider.jsx";
import { toast } from "react-toastify";
import { generateHourlyLabels } from "../../utils/generateHourlxLabels.jsx";

function Home() {
  const [selectedDate, setSelectedDate] = useState("");
  const [sensors, setSensors] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState(1);
  const [selectedInterval, setSelectedInterval] = useState({
    value: "24h",
    label: "24 horas minutos",
    duration: 24,
  });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeBtn, setActiveBtn] = useState(null);
  const [activeOptions, setActiveOptions] = useState([]);
  const [line, setLine] = useState("");
  const [labels, setLabels] = useState([]);
  const [visibleLines, setVisibleLines] = useState({
    line1: false,
    line2: false,
    line3: false,
  });
  const defaultIntervalOptions = [
    { value: "0", label: "Selecione um intervalo ▼" },
    { value: "30m", label: "30 minutos", duration: 0.5 },
    { value: "1h", label: "1 hora", duration: 1 },
    { value: "3h", label: "3 horas", duration: 3 },
    { value: "6h", label: "6 horas", duration: 6 },
    { value: "24h", label: "24 horas", duration: 24 },
  ];

  const [intervalOptions, setIntervalOptions] = useState(
    defaultIntervalOptions
  );

  const updateIntervalOptions = () => {
    const isSmallScreen = window.innerWidth < 1020;
    setIntervalOptions(
      isSmallScreen
        ? defaultIntervalOptions.filter((option) => option.duration <= 3)
        : defaultIntervalOptions
    );
  };

  useEffect(() => {
    // Executa ao carregar o componente e ao redimensionar a tela
    updateIntervalOptions();
    window.addEventListener("resize", updateIntervalOptions);
    return () => window.removeEventListener("resize", updateIntervalOptions);
  }, []);

  const GraphsBtns = [
    {
      name: "Vento",
      id: 1,
      options: [
        { id: "1", label: "Avg. Wind Speed" },
        { id: "2", label: "Gust Wind Speed" },
      ],
    },
    {
      name: "Temperatura",
      id: 2,
      options: [{ id: "1", label: "Temperatura" }],
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
        [
          0, 30, 10, 14, 2, 90, 10, 80, 29, 15.4, 13, 1, 2, 3, 4, 5, 6, 8, 0,
          10, 11, 25, 32, 12, 11, 2,
        ],
        [
          40, 30, 20, 25, 24, 26, 20, 14, 18, 19, 12, 20, 13, 24, 28, 19, 22,
          23, 30, 35, 36, 38, 40, 27,
        ],
      ],
      color: ["#0e95e3", "#0ecc37"],
      rgba: ["rgba(14, 149, 227, 0.8)", "rgba(8, 191, 81, 0.8)"],
    },
    {
      name: "Temperatura",
      data: [
        [
          40, 30, 20, 25, 24, 26, 20, 14, 18, 19, 12, 20, 13, 24, 28, 19, 22,
          23, 30, 35, 36, 38, 40, 27,
        ],
      ],
      color: ["#d41515"],
      rgba: ["rgba(163, 23, 23, 0.4)"],
    },
    {
      name: "Diversos",
      data: [
        [
          40, 30, 20, 25, 24, 26, 20, 14, 18, 19, 12, 20, 13, 24, 28, 19, 22,
          23, 30, 35, 36, 38, 40, 27,
        ],
        [
          0, 30, 10, 14, 2, 90, 10, 80, 29, 15.4, 13, 1, 2, 3, 4, 5, 6, 8, 0,
          10, 11, 25, 32, 12, 11, 2,
        ],
      ],
      color: ["#d40d77", "#6c08cf"],
      rgba: ["rgba(212, 13, 119, 0.8)", "rgba(91, 10, 171, 0.8)"],
    },
  ];

  const dateInputRef = useRef(null);

  useEffect(() => {
    const updateDate = () => {
      const date = selectedDate ? new Date(selectedDate) : new Date();
      if (!isNaN(date)) {
        setCurrentDate(date);
      } else {
        setCurrentDate(new Date());
      }
    };

    updateDate();
    const intervalId = setInterval(updateDate, 1000);
    return () => clearInterval(intervalId);
  }, [selectedDate]);

  const mockUser = {
    name: localStorage.getItem("nome"),
  };

  useEffect(() => {
    const mockSensors = [
      { id: "sensor1", name: "sensor1" },
      { id: "sensor2", name: "sensor2" },
      { id: "sensor3", name: "sensor3" },
    ];
    setSensors(mockSensors);

    console.log(selectedSensor);
  }, []);

  useEffect(() => {
    const updateDate = () => {
      const date = selectedDate
        ? new Date(selectedDate + "T00:00:00")
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
    const { value, name } = event.target;

    if (value === "0") {
      toast.warn("Selecione um intervalo ou um sensor válido");
      return;
    }

    if (name === "interval") {
      const selectedInterval = intervalOptions.find(
        (option) => option.value === value
      );

      if (!selectedInterval) {
        toast.warn("Selecione um intervalo válido");
        return;
      }

      setSelectedInterval(selectedInterval);
    }

    if (name === "sensor") {
      const selectedSensor = sensors.find(
        (sensor) => sensor.id === parseInt(value)
      );
      if (!selectedSensor) {
        toast.warn("Selecione um sensor válido");
      } else {
        setSelectedSensor(selectedSensor.id);
      }
    }
  };

  useEffect(() => {
    if (selectedInterval) {
      const newLabels = generateHourlyLabels(selectedInterval);
      setLabels(newLabels);
    }
  }, [selectedInterval]);

  const handleButtonClick = (buttonName) => {
    if (activeBtn === buttonName) {
      setActiveBtn(null);
      setActiveOptions([]);
      setVisibleLines({ line1: false, line2: false, line3: false });
      setLine("");
    } else {
      setActiveBtn(buttonName);
      setActiveOptions([]);
      setVisibleLines({ line1: false, line2: false, line3: false });
      setLine(buttonName);
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

      setVisibleLines((prev) => ({
        ...prev,
        [`line${optionId}`]: shouldActivate,
      }));
    }
  };

  const day = currentDate ? currentDate.getDate() : "";
  const month = currentDate
    ? currentDate.toLocaleString("default", {
        month: "long",
        timeZone: "America/Sao_Paulo",
      })
    : "";

  const graphicsOptionsRef = useRef(null);

  useEffect(() => {
    if (graphicsOptionsRef.current && activeBtn) {
      graphicsOptionsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [activeBtn]);

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
                name="sensor"
                value={selectedSensor}
                onChange={handleChange}
                className={styles.selectSensor}
              >
                <option value="0" className={styles.options}>
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
            <div className={styles.graphBtnsMp}>
              {GraphsBtns.map(({ name, options }) => (
                <div key={name}>
                  <GraphicsBtn
                    name={name}
                    isActive={activeBtn === name}
                    onClick={() => handleButtonClick(name)}
                  />
                  {activeBtn === name && (
                    <div ref={graphicsOptionsRef}>
                      <GraphicsOptions
                        options={options}
                        isActiveOptions={activeOptions}
                        onToggle={toggleLineVisibility}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Divider width={"90px"} />
            <select
              name="interval"
              value={selectedInterval.value}
              onChange={handleChange}
            >
              {intervalOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
              activeBtn={activeBtn}
              labels={labels}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
