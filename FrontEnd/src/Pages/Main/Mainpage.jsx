/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect, useContext } from "react";
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
import { SensorsContext } from "../../Contexts/SensorsContext.jsx";
import { AuthContext } from "../../Contexts/UserContext.jsx";

function Home() {
  const { sensorsData, setDataSelectedDate } = useContext(SensorsContext);
  const { user } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState("");
  const [sensors, setSensors] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState("");
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
      name: "K72623_lo",
      id: 1,
      options: [
        { id: "1", label: "Temperatura" },
        { id: "2", label: "Umidade" },
      ],
    },
    {
      name: "Diversos K",
      id: 2,
      options: [
        { id: "1", label: "Ruido" },
        { id: "2", label: "PM2.5"},
    ],
    },
    {
      name: "Nit2xli",
      id: 3,
      options: [
        { id: "1", label: "Temperatura" },
        { id: "2", label: "Umidade"},
        { id: "3", label: "Ultra Violeta" },
        { id: "4", label: "Radiação solar"},
      ],
    },
    {
      name: "Vento",
      id: 4,
      options: [
        { id: "1", label: "Velocidade do vento" },
        { id: "2", label: "Direção do vento" },
        { id: "3", label: "Rajada de vento"},
      ],
    },
    {
      name: "Diversos N",
      id: 5,
      options: [
        { id: "1", label: "Pressão atmosférica" },
        { id: "2", label: "Nível da chuva" },
        { id: "3", label: "Luminosidade"},
      ],
    },
  ];

  const lineDatas = [
    {
      name: "Nit2xli",  //Estação
      data: [
        sensorsData[0]?.averagePerHour.map((item) => item?.averages?.emw_temperature.toFixed(0)), //23
        sensorsData[0]?.averagePerHour.map((item) => item?.averages?.emw_humidity.toFixed(0)), //
        sensorsData[0]?.averagePerHour.map((item) => item?.averages?.emw_uv.toFixed(0)), //3
        sensorsData[0]?.averagePerHour.map((item) => item?.averages?.emw_solar_radiation.toFixed(0)), //0
      ],
      color: ["#de7c21", "#1a21ad", "#6c19bf", "#c49423"],
      rgba: ["rgba(222, 124, 33, 0.8)", "rgba(26, 33, 173, 0.8)", "rgba(121, 33, 209, 0.8)", "rgba(222, 170, 49, 0.8)"],
    },
    {
      name: "K72623_lo",  //Taffarel
      data: [
        sensorsData[1]?.averagePerHour.map((item) => item?.averages?.temperature.toFixed(0)), //21
        sensorsData[1]?.averagePerHour.map((item) => item?.averages?.humidity.toFixed(0)), //81
      ],
      color: ["#d40d77", "#6c08cf"],
      rgba: ["rgba(212, 13, 119, 0.8)", "rgba(91, 10, 171, 0.8)"],
    },
    {
      name: "Vento",  //Estação
      data: [
        sensorsData[0]?.averagePerHour.map((item) => item?.averages?.emw_avg_wind_speed.toFixed(0)), //0
        sensorsData[0]?.averagePerHour.map((item) => item?.averages?.emw_wind_direction.toFixed(0)), //60
        sensorsData[0]?.averagePerHour.map((item) => item?.averages?.emw_gust_wind_speed.toFixed(0)), //0
      ],
      color: ["#0e95e3", "#0ecc37", "#0ecc40"],
      rgba: ["rgba(14, 149, 227, 0.8)", "rgba(8, 191, 81, 0.8)", "rgba(8, 255, 80, 0.8)"],
    },
    {
      name: "Diversos K", //Taffarel
      data: [
        sensorsData[1]?.averagePerHour.map((item) => item?.averages?.noise.toFixed(0)), //63
        sensorsData[1]?.averagePerHour.map((item) => item?.averages?.pm2_5.toFixed(0)), //5
      ],
      color: ["#d40d77", "#6c08cf"],
      rgba: ["rgba(212, 13, 119, 0.8)", "rgba(91, 10, 171, 0.8)"],
    },
    {
      name: "Diversos N", //Estação
      data: [
        sensorsData[0]?.averagePerHour.map((item) => item?.averages?.emw_atm_pres.toFixed(0)), //976
        sensorsData[0]?.averagePerHour.map((item) => item?.averages?.emw_rain_lvl.toFixed(0)), //2994
        sensorsData[0]?.averagePerHour.map((item) => item?.averages?.emw_luminosity.toFixed(0)), //23991
      ],
      color: ["#4c2a75", "#2fa8eb", "#b9de26"],
      rgba: ["rgba(76, 42, 117, 0.8)", "rgba(60, 183, 250, 0.8)", "rgba(211, 255, 51, 0.8)"],
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
    console.log(user.name)
    updateDate();
    const intervalId = setInterval(updateDate, 1000);
    return () => clearInterval(intervalId);
  }, [selectedDate]);

  const getBrazilDateISO = (date = new Date()) => {
    const brDate = new Date(date.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
    const year = brDate.getFullYear();
    const month = String(brDate.getMonth() + 1).padStart(2, "0"); // Ajusta mês para 2 dígitos
    const day = String(brDate.getDate()).padStart(2, "0"); // Ajusta dia para 2 dígitos
    return `${year}-${month}-${day}`; // Formato ISO
  };

  const getMinDate = () => {
    const brDate = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
    brDate.setMonth(brDate.getMonth() - 1); // Subtrai 1 mês
    return brDate;
  };

  

   useEffect(() => {
    if (sensorsData && sensorsData.length > 0) {
      const sensorNames = sensorsData.map(sensor => sensor.deviceName);
      setSensors(sensorNames);
      if (!selectedSensor){
        setSelectedSensor(sensorNames[0]); //Para evitar trocar também para o sensor 1 quando uma data é selecionada
      }
    }
  }, [sensorsData]);

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
    setDataSelectedDate(date);
    setSelectedDate(date);
  };

  const handleIntervalChange = (event) => {
  const selectedInterval = intervalOptions.find(option => option.value === event.target.value);
  if (!selectedInterval) {
    toast.warn("Selecione um intervalo válido");
    return;
  }
  setSelectedInterval(selectedInterval);
};

   const handleSensorChange = (event) => {
    const selectedDeviceName = event.target.value;

    if (!sensors.includes(selectedDeviceName)) {
      toast.warn("Selecione um sensor válido para o dispositivo");
    } else {
      setSelectedSensor(selectedDeviceName);  // Atualiza o sensor selecionado
    }
  };

  useEffect(() => {
    if (selectedInterval) {
      const newLabels = generateHourlyLabels(selectedInterval);
      if (selectedInterval.value === defaultIntervalOptions[5].value) {
        const newLabels6h = generateHourlyLabels(defaultIntervalOptions[4]);
        setLabels([newLabels, newLabels6h]); // Agora passa ambos os conjuntos de labels em um array
      } else {
        const newLabels6h = newLabels;
        setLabels([newLabels, newLabels6h]); // Para outros intervalos, ainda passa o conjunto único
      }
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

  const filteredGraphs = GraphsBtns.filter((graphBtn) => {
  if (selectedSensor === "Micropartículas Rótula do Taffarel") {
    return graphBtn.id !== 3 && graphBtn.id !== 4 && graphBtn.id !== 5;
  } else if (selectedSensor === "Estação Cruzeiro") {
    return graphBtn.id !== 1 && graphBtn.id !== 2;
  }
  return true; 
});

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
                max={getBrazilDateISO()}
                min={getBrazilDateISO(getMinDate())} 
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
                onChange={handleSensorChange}
                className={styles.selectSensor}
              >
                <option value="0" className={styles.options}>
                  Selecione um sensor ▼
                </option>
                {sensorsData.map((sensor) => (
                  <option
                    key={sensor.deviceName}
                    value={sensor.deviceName}
                    className={styles.options}
                  >
                    {sensor.deviceName}
                  </option>
                ))}
              </select>
            </div>
            <Divider width={"90px"} />
            <div className={styles.graphBtnsMp}>
              {filteredGraphs.map(({ name, options }) => (
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
              onChange={handleIntervalChange}
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
              Bem-vindo de volta, <span>{user.name}</span>
            </h1>
            <p>
              Dê uma olhada nos gráficos atualizados constantemente, abaixo.
            </p>
            <GraphicContainer
              visibleLines={visibleLines}
              line={line}
              lineDatas={lineDatas}
              activeBtn={activeBtn}
              labels={labels[0]}
              labels6h={labels[1]}
              selectedSensor={selectedSensor}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
