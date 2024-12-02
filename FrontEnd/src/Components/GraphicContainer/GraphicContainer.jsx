/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo, useContext} from "react";
import { useMediaQuery } from "react-responsive";
import styles from "./styles.module.scss";

import DropdownBtn from "../../Components/Buttons/DropDownBtn/dropDownBtn.jsx";

import HorizontalBarGraph from "./Graphs/HorizontalBarGraph/HorizontalBarGraph.jsx";
import LineGraph from "./Graphs/LineGraph/LineGraph.jsx";
import VerticalBarGraph from "./Graphs/VerticalBarGraph/VerticalBarGraph.jsx";
import Barometer from "./Graphs/BarometerGraph/BarometerGraph.jsx";

import tempDark from "../../assets/thermometer-temperature.svg";
import tempLight from "../../assets/thermometer-temperature-white.png";
import humidDark from "../../assets/rainIcon.png";
import humidLight from "../../assets/rainIconDark.png";
import dustDark from "../../assets/dust_dark.png"
import dustLight from "../../assets/dust_white.png"

import Frame from "../Utilities/Frame/frame.jsx";
import RadialBarCharts from "./Graphs/SpeedometerGraph/SpeedometerGraph.jsx";
import WindRose from "./Graphs/WindRoseGraph/WindRoseGraph.jsx";
import GraphModal from "../Modals/GraphsModal/graphModal.jsx";
import SmallContainer from "../Utilities/SmallContainer/SmallContainer.jsx";
import ThemeSwap from "../ThemeSwap/themeSwap.jsx";

import useWindowResize from "../../Hooks/useWindowResize.jsx";
import Skeleton from "@mui/material/Skeleton";

import { PiWindDuotone } from "react-icons/pi";
import { IoRainyOutline } from "react-icons/io5";
import { GiOppression, GiSunRadiations } from "react-icons/gi";
import { BsLampFill, BsTrash3, BsTrash3Fill } from "react-icons/bs";
import { MdNoiseControlOff } from "react-icons/md";
import { FaRegSun, FaSun } from "react-icons/fa6";
import { SensorsContext } from "../../Contexts/SensorsContext.jsx";

const GraphicContainer = ({
  visibleLines,
  lineDatas = [],
  line,
  activeBtn,
  labels,
  labels6h,
  selectedSensor,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [modalCategory, setModalCategory] = useState("");
  const [isloading, setIsLoading] = useState(true);
  const [maxDataValue, setMaxDataValue] = useState({
    UVGraph: 0,
    LuminosityGraph: 0,
    NoiseGraph: 0,
    rainData: 0,
  });

  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [noise, setNoise] = useState(null);
  const [luminosity, setLuminosity] = useState(null);
  const [uv, setUV] = useState(null);
  const [rainLvl, setRainLvl] = useState(null)

  const { sensorsData } = useContext(SensorsContext);
                                              
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const HandleTH = () => {
    if (selectedSensor === "Estação Cruzeiro") {
      // Verifica o primeiro sensor, se não tiver valor tenta o segundo
      const temp = sensorsData[0]?.averagePerHour.map((item) => item?.averages?.emw_temperature.toFixed(0)) || 0;
      const hum = sensorsData[0]?.averagePerHour.map((item) => item?.averages?.emw_humidity.toFixed(0)) || 0;
      const noise = sensorsData[1]?.averagePerHour.map((item) => item?.averages?.noise.toFixed(0)) || 0;
      const luminosity = sensorsData[0]?.averagePerHour.map((item) => item?.averages?.emw_luminosity.toFixed(0));
      const UV = sensorsData[0]?.averagePerHour.map((item) => item?.averages?.emw_uv.toFixed(0));
      const rainLvl = sensorsData[0]?.averagePerHour.map((item) => item?.averages?.emw_rain_lvl.toFixed(0));
      setRainLvl(rainLvl);
      setNoise(noise);
      setLuminosity(luminosity);
      setUV(UV);
      setTemperature(temp);
      setHumidity(hum);
    } else {
      // Verifica o primeiro sensor, se não tiver valor tenta o segundo
      const temp = sensorsData[1]?.averagePerHour.map((item) => item?.averages?.temperature.toFixed(0))  || 0;
      const hum = sensorsData[1]?.averagePerHour.map((item) => item?.averages?.humidity.toFixed(0)) || 0;
      const noise = sensorsData[1]?.averagePerHour.map((item) => item?.averages?.noise.toFixed(0)) || 0;
      const luminosity = sensorsData[0]?.averagePerHour.map((item) => item?.averages?.emw_luminosity.toFixed(0));
      const UV = sensorsData[0]?.averagePerHour.map((item) => item?.averages?.emw_uv.toFixed(0));
      const rainLvl = sensorsData[0]?.averagePerHour.map((item) => item?.averages?.emw_rain_lvl.toFixed(0));
      setRainLvl(rainLvl);
      setNoise(noise);
      setLuminosity(luminosity);
      setUV(UV);
      setTemperature(temp);
      setHumidity(hum);
    }
  };

  useEffect(() => {
    HandleTH();
  }, [selectedSensor, sensorsData]); // Atualiza a cada alteração em selectedSensor ou sensorsData

  const isHidden = useWindowResize(926);

 

  const TempGraph = [
    {
      name: "Temperatura",
      data: [temperature], 
      color: selectedSensor === "Estação Cruzeiro" ? ["#de7c21"] : ["#d40d77"], // Cor condicional
      rgba: selectedSensor === "Estação Cruzeiro" ? ["rgba(222, 124, 33, 0.8)"] : ["rgba(212, 13, 119, 0.8)"], // RGBA condicional
      xLabels: labels, 
    },
  ];
  
  const HumidGraph = [
    {
      id: "humidity",
      name: "Úmidade",
      data: [humidity],
      gradientStartColor: selectedSensor === "Estação Cruzeiro" ? "rgba(40, 71, 209, 1)" : "rgba(106, 17, 194, 1)", // Gradiente inicial condicional
      gradientEndColor: selectedSensor === "Estação Cruzeiro" ? "rgba(26, 33, 173, 1)" : "rgba(66, 16, 122, 1)", // Gradiente final condicional
      rgba: ["rgba(74, 33, 222, 0.8)"], // RGBA fixo para o gráfico de umidade
      xLabels: labels,
    },
  ];
  

  const Pm25Graph = [
    {
      id: "Pm2_5",
      name: "Pm2_5",
      data: [sensorsData[1]?.averagePerHour.map((item) => item?.averages?.pm2_5.toFixed(0))],
      gradientStartColor: "rgba(94, 60, 32, 1)",
      gradientEndColor: "rgba(38, 21, 6, 1)",
      rgba: ["rgba(38, 21, 6, 0.8)"],
      xLabels: labels,
    },
  ];

  const AtmPresGraph = [
    {
      name: "Atmospheric Pressure",
      data: [sensorsData[0]?.averagePerHour.map((item) => item?.averages?.emw_atm_pres.toFixed(0))],
      color: ["#4c2a75"],
      rgba: ["rgba(76, 42, 117, 0.8)"],
      xLabels: labels, 
    },
  ];  

  const rainData = [
    {
      id: "rain",
      name: "Chuva",
      data: sensorsData[0]?.averagePerHour.map((item) => item?.averages?.emw_rain_lvl.toFixed(0)),
      gradientStartColor: "rgba(0, 123, 255, 1)",
      gradientEndColor: "rgba(0, 180, 255, 1)",
      xLabels: labels,
    },
  ];

  const solarRadiationData = [
    {
      id: "solar",
      name: "Radiação Solar",
      data: [sensorsData[0]?.averagePerHour.map((item) => item?.averages?.emw_solar_radiation)],
      gradientStartColor: "rgba(219, 142, 9, 1)",
      gradientEndColor: "rgba(255, 238, 0, 1)",
      xLabels: labels,
    },
  ];

  const WindDirectionGraph = [
    {
      name: "Direção do Vento",
      data: [sensorsData[0]?.averagePerHour.map((item) => item?.averages?.emw_wind_direction.toFixed(0))],
      color: ["#5eff00"],
      rgba: ["rgba(115, 255, 0, 0.8)"],
      xLabels: labels,
    },
  ];

  const WindSpeedGraph = [
    {
      name: "Velocidade do Vento",
      data: [sensorsData[0]?.averagePerHour.map((item) => item?.averages?.emw_avg_wind_speed.toFixed(0))],
      color: ["#3399ff"],
      rgba: ["rgba(51, 153, 255, 0.8)"],
      xLabels: labels,
    },
  ];

  const WindGustGraph = [
    {
      id: "windGust",
      name: "Rajada de Vento",
      data: [sensorsData[0]?.averagePerHour.map((item) => item?.averages?.gust_wind_speed)],
      gradientStartColor: "rgba(255, 99, 71, 1)",
      gradientEndColor: "rgba(255, 69, 0, 1)",
      rgba: ["rgba(255, 99, 71, 0.8)"],
      xLabels: labels,
    },
  ];

  const UVGraph = useMemo(() => [
    {
      name: "UV",
      data: [[sensorsData[0]?.averagePerHour.map((item) => item?.averages?.emw_uv)]],
      color: ["#6c19bf"],
      rgba: ["rgba(121, 33, 209, 0.8)"],
      xLabels: labels6h,
    },
  ], [labels6h]); 

  const LuminosityGraph = useMemo(() => [
    {
      name: "Luminosidade",
      data: luminosity ? [luminosity.flat()] : [[]],
      color: ["#b9de26"],
      rgba: ["rgba(211, 255, 51, 0.8)"],
      xLabels: labels6h,
    },
  ], [luminosity, labels6h]);

  const NoiseGraph = useMemo(() => [
    {
      name: "Noise",
      data: [noise],
      color: ["#d500ed"],
      rgba: ["rgba(194, 15, 214, 0.8)"],
      xLabels: labels6h,
    },
  ], [labels6h]); // Se "labels" for uma dependência que muda com o tempo

   const generateDataGustWindBar = () => {
  const dataGustWindBar = [];
  const values = WindGustGraph[0];

  const labels = [];
  const currentHour = new Date();
  
  // Adiciona a hora atual e as 4 anteriores
  for (let i = 0; i < 5; i++) {
    const label = new Date(currentHour);
    label.setHours(currentHour.getHours() - i); // Subtrai as horas para pegar as horas anteriores
    labels.push(label.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }

  for (let i = 0; i < 5; i++) {
    const label = labels[i];
    const value = values[4 - i];

    dataGustWindBar.push({
      label: label,
      value: value,
      backgroundColor:
        "linear-gradient(90deg, rgba(88, 209, 175, 1) 0%, rgba(131, 238, 247, 1) 100%)",
    });
  }

  return dataGustWindBar.reverse();
};


  const dataGustWindBar = generateDataGustWindBar();

  const openModal = (category, valueType) => {
    setModalCategory(category);
    setSelectedType(valueType);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const getLastValue = (graph, name) => {
    const data = graph.find((item) => item.name === name);
    const lastValue = data?.data[0]?.[data.data[0].length - 1] || null;
    return lastValue;
};


  const lastExternalTemp = getLastValue(TempGraph, "Temperatura");
  const lastExternalHumid = getLastValue(HumidGraph, "Úmidade");
  const lastPm2_5 = getLastValue(Pm25Graph, "Pm2_5");
  const lastAtmPres = getLastValue(AtmPresGraph, "Atmospheric Pressure");
  const lastWindDir = getLastValue(WindDirectionGraph, "Direção do Vento");
  const lastWindSpd = getLastValue(WindSpeedGraph, "Velocidade do Vento")

   useEffect(() => {
     if (uv) {
      const calculatedMaxValue = Math.max(...uv);
       setMaxDataValue((prevMax) => ({
        ...prevMax,
         UVGraph: calculatedMaxValue,
       }));
     }

     if (luminosity) {
       const calculatedMaxValue = Math.max(...luminosity);
       setMaxDataValue((prevMax) => ({
         ...prevMax,
         LuminosityGraph: calculatedMaxValue,
       }));
    }

    if (noise) {
       const calculatedMaxValue = Math.max(...noise);
       setMaxDataValue((prevMax) => ({
         ...prevMax,
         NoiseGraph: calculatedMaxValue,
      }));
    }

    if (rainLvl) {
      const calculatedMaxValue = Math.max(...rainLvl);
      setMaxDataValue((prevMax) => ({
        ...prevMax,
        rainData: calculatedMaxValue,
     }));
   }
   }, [UVGraph, LuminosityGraph, NoiseGraph, rainData]);

  const modalData = {
  temperatura: {
    title: "Temperatura",
    graphType: "line",
    graphData: TempGraph[0],
    degreeSymbol: "°C",
  },
  umidade: {
    title: "Umidade",
    graphType: "bar",
    graphData: HumidGraph[0],
    degreeSymbol: "%",
  },
  "Direção do Vento": {
    title: "Direção do Vento",
    graphType: "line",
    graphData: WindDirectionGraph[0],
    degreeSymbol: "º",
  },
  "Velocidade do Vento": {
    title: "Velocidade do Vento",
    graphType: "line",
    graphData: WindSpeedGraph[0],
    degreeSymbol: "km/h",
  },
  "Rajada de Vento": {
    title: "Rajada de Vento",
    graphType: "bar",
    graphData: WindGustGraph[0],
    degreeSymbol: "km/h",
  },
  "Pm2_5": {
    title: "Pm2_5",
    graphType: "bar",
    graphData: Pm25Graph[0],
    degreeSymbol: "g/m",
  },
  "Pressao Atmosferica": {
    title: "Pressão Atmosférica",
    graphType: "line",
    graphData: AtmPresGraph[0],
    degreeSymbol: "hPa",
  },
};

const getMaxYValue = () => {
  let maxY = 0;

  Object.keys(visibleLines).forEach((key, index) => {
    if (visibleLines[key]) {
      const lineData = lineDatas.find((item) => item.name === line);
      if (lineData && lineData.data[index]) {
        const currentMax = Math.max(...lineData.data[index]);
        maxY = Math.max(maxY, currentMax);
      }
    }
  });

  return maxY;
};

const yMax = getMaxYValue() || 100;

const currentModal = modalData[modalCategory];
const isSmallScreen = useMediaQuery({ maxWidth: 1440 });


  return (
    <section className={styles.graphs}>
      {isModalVisible && currentModal && (
      <GraphModal
        onClose={closeModal}
        isVisible={isModalVisible}
        title={currentModal.title}
        graphType={currentModal.graphType}
        graphData={currentModal.graphData}
        degreeSymbol={currentModal.degreeSymbol}
      />
    )}

      <div className={styles.graphsTop}>
         {isloading ? (
          <Skeleton variant="rounded" width="100%" height={350} />
        ) : ( <Frame isTitle={true} title="Principal" width="78.2%" height="350px">
         <LineGraph
            lines={Object.keys(visibleLines)
              .map((key, index) => {
                if (!visibleLines[key]) return null;

                const lineData = lineDatas.find((item) => item.name === line);
                const color = lineData?.color[index] || "";
                const fillColor = lineData?.rgba[index] || "";

                return {
                  data: lineData ? lineData.data[index] : [],
                  strokeColor: color,
                  fillColor: fillColor || color,
                };
              })
              .filter(Boolean)}
            width="100%"
            height={250}
            xLabels={labels}
            showDegreeSymbol={
              activeBtn === "Temperatura" || activeBtn === "Vento"
            }
            degreeSymbol={
              activeBtn === "Temperatura"
                ? "°C"
                : activeBtn === "Vento"
                ? "km/h"
                : ""
            }
            yMax={yMax}
            tooltipStyle="style2"
          /> 
        </Frame>)}
        <div className={styles.tempContainer}>
          <div
            onClick={() => openModal("temperatura", "Temperatura")}
            style={{ cursor: "pointer" }}
          >
            {isloading ? (
          <Skeleton variant="rounded" width="100%" height={350} />
        ) : (<Frame
              isTitle={true}
              title={"Temperatura"}
              width={isSmallScreen ? "100%" : "105%"}
              height="168.5px"
            >
              <SmallContainer
                lastValue={lastExternalTemp}
                light={tempLight}
                dark={tempDark}
                complement={"ºC"}
              />
            </Frame>)}
          </div>
          <div
            onClick={() => openModal("umidade", "Úmidade")}
            style={{ cursor: "pointer" }}
          >
            {isloading ? (
          <Skeleton variant="rounded" width="100%" height={350} />
        ) : (<Frame
              isTitle={true}
              title={"Umidade"}
              width={isSmallScreen ? "100%" : "105%"}
              height="168.5px"
            >
              <SmallContainer
                lastValue={lastExternalHumid}
                light={humidLight}
                dark={humidDark}
                complement={"%"}
              />
            </Frame>)}
          </div>
        </div>
      </div>
      <div className={styles.graphsBot}>
        {isloading ? (
          <Skeleton variant="rounded" width="100%" height={350} />
        ) : (<Frame
          isTitle={true}
          title={"Nível de Chuva"}
          width={isSmallScreen ? "53.5%" : "54%"}
          height="320px"
        >
          <VerticalBarGraph
              bars={rainData[0].data}
              xLabels={rainData[0].xLabels}
              yMax={maxDataValue.rainData}
              width="100%"
              height={300}
              barWidth={20}
              barSpacing={10}
              gradientStartColor={rainData[0].gradientStartColor}
              gradientEndColor={rainData[0].gradientEndColor}
              gradientId={rainData[0].id}
              tooltipStyle="style2"
            />
          
        </Frame>)}
          
        {!isHidden && (
          <Frame
            isTitle={true}
            title={"Velocidade do Vento"}
            width="23%"
            height="320px"
          >
            <div
              onClick={() =>
                openModal("Velocidade do Vento", "Velocidade do Vento")
              }
              style={{ cursor: "pointer" }}
            >
              <RadialBarCharts value={lastWindSpd} />
            </div>
          </Frame>
        )}
        <div
          onClick={() => openModal("Rajada de Vento", "Rajada de Vento")}
          style={{ cursor: "pointer" }}
          className={styles.gustWind}
        >
          {isloading ? (
          <Skeleton variant="rounded" width="100%" height={350} />
        ) : ( <Frame isTitle={true} title={"Rajada de Vento"} width={"100%"} height={"100%"}>
            <HorizontalBarGraph dataBar={dataGustWindBar} maxValue={120} />
          </Frame>)}
        </div>
      </div>
      <div className={styles.dropDownBtnsBot}>
        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          {isloading ? (
          <Skeleton variant="rounded" width="100%" height={350} />
        ) : (<DropdownBtn
            title="Direção do Vento"
            icon={() => <ThemeSwap lightImage={{
              component: PiWindDuotone,
              props: { color: "#000", size: "1.3em" },
            }}
            darkImage={{
              component: PiWindDuotone,
              props: { color: "#fff", size: "1.3em" },
            }}/>} 
            width={"26.8vw"}
          >
            <div
              onClick={() => openModal("Direção do Vento", "Direção do Vento")}
              style={{ cursor: "pointer", width: "90%" }}
            >
              <WindRose direction={lastWindDir} size={300} />
            </div>
          </DropdownBtn>)}
          {isloading ? (
          <Skeleton variant="rounded" width="100%" height={350} />
        ) : (<DropdownBtn
            title="PM2_5"
            icon={() => <ThemeSwap lightImage={{
              component: BsTrash3,
              props: { color: "#000", size: "1.2em" },
            }}
            darkImage={{
              component: BsTrash3Fill,
              props: { color: "#fff", size: "1.2em" },
            }}/>} 
            width={"26.8vw"}>
              <div
              onClick={() => openModal("Pm2_5", "Pm2_5")}
              style={{ cursor: "pointer", width: "90%", display: "flex", justifyContent: "center", marginTop: "20%", marginBottom: "20%"}}
            >
              <SmallContainer lastValue={lastPm2_5} light={dustLight} dark={dustDark} complement="µm"/>
              </div>
          </DropdownBtn>)}
          {isloading ? (
          <Skeleton variant="rounded" width="100%" height={350} />
        ) : (<DropdownBtn
            title="Pressão Atmosférica"
            icon={() => <ThemeSwap lightImage={{
            component: GiOppression,
            props: { color: "#000", size: "1.3em" },
          }}
          darkImage={{
            component: GiOppression,
            props: { color: "#fff", size: "1.3em" },
          }}/>} 
            width={"26.8vw"}
          >
            <div
              onClick={() => openModal("Pressao Atmosferica", "Pressao Atmosferica")}
              style={{ cursor: "pointer", width: "90%" }}
            >
            <Barometer pressure={lastAtmPres} minPressure={800} maxPressure={1200} />
            </div>
          </DropdownBtn>)}
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        {isloading ? (
          <Skeleton variant="rounded" width="100%" height={350} />
        ) : (<DropdownBtn title="UV" icon={() => <ThemeSwap lightImage={{
            component: FaRegSun,
            props: { color: "#000", size: "1.3em" },
          }}
          darkImage={{
            component: FaSun,
            props: { color: "#fff", size: "1.3em" },
          }}/>}  width={"26.8vw"}>
            <LineGraph
              lines={[
                {
                  data: uv,
                  strokeColor: UVGraph[0].color,
                  fillColor: UVGraph[0].rgba,
                },
              ]}
              xLabels={UVGraph[0].xLabels}
              yMax={maxDataValue.UVGraph}
              showDegreeSymbol={false}
              tooltipStyle="style2"
            />
          </DropdownBtn>)}
          {isloading ? (
          <Skeleton variant="rounded" width="100%" height={350} />
        ) : (<DropdownBtn
          title="Luminosidade"
          icon={() => <ThemeSwap lightImage={{
            component: BsLampFill,
            props: { color: "#000", size: "1.2em" },
          }}
          darkImage={{
            component: BsLampFill,
            props: { color: "#fff", size: "1.2em" },
          }}/>} 
          width={"26.8vw"}>
            <LineGraph
              lines={[
                {
                  data: LuminosityGraph[0].data[0],
                  strokeColor: LuminosityGraph[0].color,
                  fillColor: LuminosityGraph[0].rgba,
                },
              ]}
              xLabels={LuminosityGraph[0].xLabels}
              yMax={maxDataValue.LuminosityGraph}
              showDegreeSymbol={false}
              tooltipStyle="style2"
            />
          </DropdownBtn>)}
          {isloading ? (
          <Skeleton variant="rounded" width="100%" height={350} />
        ) : (<DropdownBtn
          title="Ruido"
          icon={() => <ThemeSwap lightImage={{
            component: MdNoiseControlOff,
            props: { color: "#000", size: "1.3em" },
          }}
          darkImage={{
            component: MdNoiseControlOff,
            props: { color: "#fff", size: "1.3em" },
          }}/>} 
          width={"26.8vw"}>
          <LineGraph
              lines={[
                {
                  data: noise,
                  strokeColor: NoiseGraph[0].color,
                  fillColor: NoiseGraph[0].rgba,
                },
              ]}
              xLabels={NoiseGraph[0].xLabels}
              yMax={maxDataValue.NoiseGraph}
              showDegreeSymbol={false}
              tooltipStyle="style2"
            />
          
          </DropdownBtn>)}
        </div>
        <div
          style={{
            minWidth: "95%",
            display: "flex",
            margin: "0 auto",
          }}
        >
          {isloading ? (
          <Skeleton variant="rounded" width="100%" height={350} />
        ) : (<DropdownBtn
            title="Radiação Solar"
            icon={() => <ThemeSwap lightImage={{
            component: GiSunRadiations,
            props: { color: "#000", size: "1.3em" },
          }}
          darkImage={{
            component: GiSunRadiations,
            props: { color: "#fff", size: "1.3em" },
          }}/>}
            width={"95%"}
          >
            {" "}
            <VerticalBarGraph
            bars={solarRadiationData[0].data}
            xLabels={solarRadiationData[0].xLabels}
            yMax={100}
            width="100%"
            height={300}
            barWidth={20}
            barSpacing={10}
            gradientStartColor={solarRadiationData[0].gradientStartColor}
            gradientEndColor={solarRadiationData[0].gradientEndColor}
            gradientId={solarRadiationData[0].id}
            tooltipStyle="style2"
          />
          </DropdownBtn>)}
        </div>
      </div>
    </section>
  );
};

export default GraphicContainer;
