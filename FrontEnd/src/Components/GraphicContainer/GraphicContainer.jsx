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

  const generateDataBar = () => {
    const dataBar = [];
    const today = new Date();

    const values = [350, 150, 300, 200, 0];

    for (let i = 0; i < 5; i++) {
      const pastDate = new Date(today);
      pastDate.setDate(today.getDate() - i);

      const label = pastDate.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      });
      const value = values[4 - i];

      dataBar.push({
        label: label,
        value: value,
        backgroundColor:
          "linear-gradient(90deg, rgba(219, 142, 9, 1) 0%, rgba(255, 238, 0, 1) 100%)",
      });
    }

    return dataBar.reverse();
  };

  const dataBar = generateDataBar();

  const generateHourlyLabels = () => {
    const labels = [];
    const now = new Date();

    for (let i = 0; i < 24; i++) {
      const hour = new Date(now.getTime() - i * 60 * 60 * 1000).getHours();
      labels.unshift(`${hour}:00`);
    }
    return labels;
  };

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
      xLabels: generateHourlyLabels(),
    },
    {
      name: "Temperatura Interna",
      data: [
        [
          25, 24, 24, 23, 23, 22, 23, 24, 26, 28, 29, 31, 33, 34, 34, 33, 32,
          30, 29, 28, 27, 26, 25, 25,
        ],
      ],
      color: ["#de7c21"],
      rgba: ["rgba(222, 124, 33, 0.8)"],
      xLabels: generateHourlyLabels(),
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
      xLabels: generateHourlyLabels(),
    },
    {
      id: "humidity",
      name: "Úmidade Interna",
      data: [
        [
          30, 32, 31, 33, 34, 36, 35, 34, 33, 31, 29, 28, 27, 25, 26, 28, 30,
          32, 33, 34, 35, 36, 37, 38,
        ],
      ],
      gradientStartColor: "rgba(58, 33, 222, 1)",
      gradientEndColor: "rgba(66, 24, 163, 1)",
      rgba: ["rgba(74, 33, 222, 0.8)"],
      xLabels: generateHourlyLabels(),
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
      gradientEndColor: "rgba(0, 213, 255, 1)",
      xLabels: generateHourlyLabels(),
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
  const lastInternalTemp = getLastValue(TempGraph, "Temperatura Interna");
  const lastExternalHumid = getLastValue(HumidGraph, "Úmidade");
  const lastInternalHumid = getLastValue(HumidGraph, "Úmidade Interna");

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
            onClick={() => openModal("temperatura", "Temperatura Interna")}
            style={{ cursor: "pointer" }}
          >
            <Frame
              isTitle={true}
              title={"Temperatura Interna"}
              width="105%"
              height="168.5px"
            >
              <SmallContainer
                lastValue={lastInternalTemp}
                light={tempLight}
                dark={tempDark}
                complement={"ºC"}
              />
            </Frame>
          </div>
        </div>
      </div>
      <div className={styles.graphsBot}>
        <div className={styles.humidityContainer}>
          <div
            onClick={() => openModal("umidade", "Úmidade")}
            style={{ cursor: "pointer" }}
          >
            <Frame isTitle={true} title={"Umidade"} width="105%" height="154px">
              <SmallContainer
                lastValue={lastExternalHumid}
                light={humidLight}
                dark={humidDark}
                complement={"%"}
              />
            </Frame>
          </div>
          <div
            onClick={() => openModal("umidade", "Úmidade Interna")}
            style={{ cursor: "pointer" }}
          >
            <Frame
              isTitle={true}
              title={"Umidade Interna"}
              width="105%"
              height="154px"
            >
              <SmallContainer
                lastValue={lastInternalHumid}
                light={humidLight}
                dark={humidDark}
                complement={"%"}
              />
            </Frame>
          </div>
        </div>

        <Frame
          isTitle={true}
          title={"Radiação Solar"}
          width="54.9%"
          height="320px"
        >
          <HorizontalBarGraph dataBar={dataBar} maxValue={350} />
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
      </div>
      <div className={styles.dropDownBtnsBot}>
        <DropdownBtn
          title="Direção do Vento"
          icon={PiWindDuotone}
          width={"31.12%"}
        >
          <WindRose direction={0} size={300} />{" "}
        </DropdownBtn>

        <DropdownBtn
          title="Nível de Chuva"
          icon={IoRainyOutline}
          width={"31.12%"}
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
          />
        </DropdownBtn>
        <DropdownBtn
          title="Pressão Atmosférica"
          icon={GiOppression}
          width={"31.12%"}
        >
          <Barometer value={80} />
        </DropdownBtn>
      </div>
    </section>
  );
};

export default GraphicContainer;
