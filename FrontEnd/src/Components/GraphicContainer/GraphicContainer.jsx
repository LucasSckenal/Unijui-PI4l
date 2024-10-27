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

    // Array de valores de radiação solar
    const values = [350, 150, 300, 200, 220];

    // Loop para os últimos 7 dias
    for (let i = 0; i < 5; i++) {
        const pastDate = new Date(today); // Copiar a data atual
        pastDate.setDate(today.getDate() - i); // Subtrair os dias

        // Formatar a data como 'DD/MM'
        const label = pastDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

        // Obter o valor correspondente ao dia (inverte a ordem)
        const value = values[4 - i]; // Acessa os valores na ordem correta

        dataBar.push({
            label: label,
            value: value,
            backgroundColor:
                "linear-gradient(90deg, rgba(219, 142, 9, 1) 0%, rgba(255, 238, 0, 1) 100%)",
        });
    }

    return dataBar.reverse(); // Inverte para que o dia atual fique na parte superior
};

  // Chama a função para gerar os dados
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
      name: "Úmidade",
      data: [
        [
          10, 15, 25, 35, 45, 50, 60, 70, 80, 90, 85, 75, 65, 55, 50, 45, 40,
          35, 30, 25, 20, 15, 10, 5,
        ],
      ],
      color: ["url(linear-gradient(90deg, rgba(58, 33, 222, 1) 0%, rgba(66, 24, 163, 1) 100%))"],
      rgba: ["rgba(74, 33, 222, 0.8)"],
      xLabels: generateHourlyLabels(),
    },
    {
      name: "Úmidade Interna",
      data: [
        [
          30, 32, 31, 33, 34, 36, 35, 34, 33, 31, 29, 28, 27, 25, 26, 28, 30,
          32, 33, 34, 35, 36, 37, 38,
        ],
      ],
      color: ["url(linear-gradient(90deg, rgba(58, 33, 222, 1) 0%, rgba(66, 24, 163, 1) 100%))"],
      rgba: ["rgba(74, 33, 222, 0.8)"],
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
        {/*É aqui que começa os gráfico da umidade*/}
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
                complement={"mm"}
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
                complement={"mm"}
              />
            </Frame>
          </div>
        </div>

        <Frame isTitle={true} title={"Radiação Solar"} width="51.5%" height="320px">
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
        <DropdownBtn title="Direção do Vento" width={"31.12%"}>
          <WindRose direction={0} size={300} />{" "}
        </DropdownBtn>

        <DropdownBtn title="Nível de Chuva" width={"31.12%"}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
          aut nam soluta libero ut quidem voluptatum nostrum atque voluptatibus
          quisquam quam modi possimus unde deserunt sed error similique fugiat!
          Rem.
        </DropdownBtn>
        <DropdownBtn title="Pressão Atmosférica" width={"31.12%"}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
          aut nam soluta libero ut quidem voluptatum nostrum atque voluptatibus
          quisquam quam modi possimus unde deserunt sed error similique fugiat!
          Rem.
        </DropdownBtn>
      </div>
    </section>
  );
};

export default GraphicContainer;
