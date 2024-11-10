/* eslint-disable react/prop-types */
import DropdownBtn from "../../Components/Buttons/DropDownBtn/dropDownBtn.jsx";
import HorizontalBarGraph from "./Graphs/HorizontalBarGraph/HorizontalBarGraph.jsx";
import LineGraph from "./Graphs/LineGraph/LineGraph.jsx";
import tempDark from "../../assets/thermometer-temperature.svg";
import tempLight from "../../assets/thermometer-temperature-white.png";
import styles from "./styles.module.scss";
import Frame from "../Utilities/Frame/frame.jsx";
import RadialBarCharts from "./Graphs/SpeedometerGraph/SpeedometerGraph.jsx";
import { useState, useEffect } from "react";
import WindRose from "./Graphs/WindRoseGraph/WindRoseGraph.jsx";
import TemperatureModal from "../Modals/TemperatureModal/TemperatureModal.jsx";
import SmallContainer from "../Utilities/SmallContainer/SmallContainer.jsx";
import humidDark from "../../assets/rainIcon.png";
import humidLight from "../../assets/rainIconDark.png";
import HumidityModal from "../Modals/HumidityModal/HumidityModal.jsx";
import Barometer from "./Graphs/BarometerGraph/BarometerGraph.jsx";
import VerticalBarGraph from "./Graphs/VerticalBarGraph/VerticalBarGraph.jsx";
import { PiWindDuotone } from "react-icons/pi";
import { IoRainyOutline } from "react-icons/io5";
import { GiOppression } from "react-icons/gi";

const GraphicContainer = ({
  visibleLines,
  lineDatas = [],
  line,
  activeBtn,
  labels,
}) => {
  const [hidden, setHidden] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [modalCategory, setModalCategory] = useState("");

  useEffect(() => {
    const handleHidden = () => {
      setHidden(window.innerWidth <= 720);
    };

    handleHidden();

    window.addEventListener("resize", handleHidden);
    return () => window.removeEventListener("resize", handleHidden);
  }, []);

  const generateDataGustWindBar = () => {
    const dataGustWindBar = [];
    const today = new Date();

    const values = [116, 100, 50, 20, 80];

    for (let i = 0; i < 5; i++) {
      const pastDate = new Date(today);
      pastDate.setDate(today.getDate() - i);

      const label = pastDate.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      });
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

  const TempGraph = [
    {
      name: "Temperatura",
      data: [
        [
          22, 21, 20, 20, 19, 19, 20, 22, 25, 28, 30, 32, 34, 35, 35, 34, 32,
          30, 28, 26, 24, 23, 23, 22,
        ],
      ],
      color: ["#de7c21"],
      rgba: ["rgba(222, 124, 33, 0.8)"],
      xLabels: labels,
    },
  ];

  const HumidGraph = [
    {
      id: "humidity",
      name: "Úmidade",
      data: [
        [
          10, 15, 25, 35, 45, 50, 60, 70, 80, 90, 85, 75, 65, 55, 50, 45, 40,
          35, 30, 25, 20, 15, 10, 5,
        ],
      ],
      gradientStartColor: "rgba(58, 33, 222, 1)",
      gradientEndColor: "rgba(66, 24, 163, 1)",
      rgba: ["rgba(74, 33, 222, 0.8)"],
      xLabels: labels,
    },
  ];

  const rainData = [
    {
      id: "rain",
      name: "Chuva",
      data: [
        10, 15, 25, 35, 45, 50, 60, 70, 80, 90, 85, 75, 65, 55, 50, 45, 40, 35,
        30, 25, 20, 15, 10, 5,
      ],
      gradientStartColor: "rgba(0, 123, 255, 1)",
      gradientEndColor: "rgba(0, 180, 255, 1)",
      xLabels: labels,
    },
  ];

  const solarRadiationData = [
    {
      id: "solar",
      name: "Radiação Solar",
      data: [
        10, 15, 25, 35, 45, 50, 60, 70, 80, 90, 85, 75, 65, 55, 50, 45, 40, 35,
        30, 25, 20, 15, 10, 5,
      ],
      gradientStartColor: "rgba(219, 142, 9, 1)",
      gradientEndColor: "rgba(255, 238, 0, 1)",
      xLabels: labels,
    },
  ];

  const openModal = (category, valueType) => {
    setModalCategory(category);
    setSelectedType(valueType);
    setModalVisible(true);
    console.log("Valuetype:" + valueType);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const getLastValue = (graph, name) => {
    const data = graph.find((item) => item.name === name);
    return data?.data[0]?.[data.data[0].length - 1] || null;
  };

  const lastExternalTemp = getLastValue(TempGraph, "Temperatura");
  const lastExternalHumid = getLastValue(HumidGraph, "Úmidade");

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

  return (
    <section className={styles.graphs}>
      {isModalVisible && modalCategory === "temperatura" && (
        <TemperatureModal
          onClose={closeModal}
          isVisible={isModalVisible}
          selectedTemp={selectedType}
          tempData={TempGraph}
        />
      )}
      {isModalVisible && modalCategory === "umidade" && (
        <HumidityModal
          onClose={closeModal}
          isVisible={isModalVisible}
          selectedHumidity={selectedType}
          humidData={HumidGraph}
        />
      )}

      <div className={styles.graphsTop}>
        <Frame isTitle={true} title="Principal" width="78.2%" height="350px">
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
            showDegreeSymbol={activeBtn === "Temperatura"}
            yMax={yMax}
          />
        </Frame>
        <div className={styles.tempContainer}>
          <div
            onClick={() => openModal("temperatura", "Temperatura")}
            style={{ cursor: "pointer" }}
          >
            <Frame
              isTitle={true}
              title={"Temperatura"}
              width="105%"
              height="168.5px"
            >
              <SmallContainer
                lastValue={lastExternalTemp}
                light={tempLight}
                dark={tempDark}
                complement={"ºC"}
              />
            </Frame>
          </div>
          <div
            onClick={() => openModal("umidade", "Úmidade")}
            style={{ cursor: "pointer" }}
          >
            <Frame
              isTitle={true}
              title={"Umidade"}
              width="105%"
              height="168.5px"
            >
              <SmallContainer
                lastValue={lastExternalHumid}
                light={humidLight}
                dark={humidDark}
                complement={"%"}
              />
            </Frame>
          </div>
        </div>
      </div>
      <div className={styles.graphsBot}>
        <Frame
          isTitle={true}
          title={"Radiação Solar"}
          width="54%"
          height="320px"
        >
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
        </Frame>

        {!hidden && (
          <Frame
            isTitle={true}
            title={"Velocidade do Vento"}
            width="23%"
            height="320px"
          >
            <RadialBarCharts value={100} />
          </Frame>
        )}

        <Frame isTitle={true} title={"Rajada de Vento"} width={"15.2%"}>
          <HorizontalBarGraph dataBar={dataGustWindBar} maxValue={120} />
        </Frame>
      </div>
      <div className={styles.dropDownBtnsBot}>
        <DropdownBtn
          title="Direção do Vento"
          icon={PiWindDuotone}
          width={"26.8vw"}
        >
          <WindRose direction={0} size={300} />
        </DropdownBtn>

        <DropdownBtn
          title="Nível de Chuva"
          icon={IoRainyOutline}
          width={"26.8vw"}
        >
          <VerticalBarGraph
            bars={rainData[0].data}
            xLabels={rainData[0].xLabels}
            yMax={100}
            width="100%"
            height={300}
            barWidth={20}
            barSpacing={10}
            gradientStartColor={rainData[0].gradientStartColor}
            gradientEndColor={rainData[0].gradientEndColor}
            gradientId={rainData[0].id}
            tooltipStyle="style2"
          />
        </DropdownBtn>
        <DropdownBtn
          title="Pressão Atmosférica"
          icon={GiOppression}
          width={"26.8vw"}
        >
          <Barometer value={80} />
        </DropdownBtn>
      </div>
    </section>
  );
};

export default GraphicContainer;
