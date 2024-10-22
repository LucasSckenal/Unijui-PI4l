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
import ThemeSwap from "../ThemeSwap/themeSwap.jsx";
import WindRose from "./Graphs/WindRoseGraph/WindRoseGraph.jsx";
import TemperatureModal from "../Modals/TemperatureModal/TemperatureModal.jsx";

const GraphicContainer = ({
  visibleLines,
  setVisibleLines,
  lineDatas = [],
  line,
  activeBtn,
}) => {
  const [hidden, setHidden] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedTemp, setSelectedTemp] = useState("");

  useEffect(() => {
    const handleHidden = () => {
      setHidden(window.innerWidth <= 720);
    };

    handleHidden();

    window.addEventListener("resize", handleHidden);
    return () => window.removeEventListener("resize", handleHidden);
  }, []);

  const resetLines = () => {
    setVisibleLines({
      1: false,
      2: false,
      3: false,
    });
  };

  const dataBar = [
    {
      label: "Category 1",
      value: 80,
      backgroundColor:
        "linear-gradient(90deg, rgba(0, 123, 255, 1) 0%, rgba(0, 213, 255, 1) 100%)",
    },
    {
      label: "Category 2",
      value: 50,
      backgroundColor:
        "linear-gradient(90deg, rgba(0, 123, 255, 1) 0%, rgba(0, 213, 255, 1) 100%)",
    },
    {
      label: "Category 3",
      value: 70,
      backgroundColor:
        "linear-gradient(90deg, rgba(0, 123, 255, 1) 0%, rgba(0, 213, 255, 1) 100%)",
    },
    {
      label: "Category 4",
      value: 25,
      backgroundColor:
        "linear-gradient(90deg, rgba(0, 123, 255, 1) 0%, rgba(0, 213, 255, 1) 100%)",
    },
  ];

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
      xLabels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
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
      xLabels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    },
  ];

  const openModal = (tempType) => {
    setSelectedTemp(tempType);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const getLastTemperatureValue = (tempName) => {
    const tempData = TempGraph.find((temp) => temp.name === tempName);
    if (tempData && tempData.data.length > 0) {
      return tempData.data[0][tempData.data[0].length - 1];
    }
    return null;
  };

  const lastExternalTemp = getLastTemperatureValue("Temperatura");
  const lastInternalTemp = getLastTemperatureValue("Temperatura Interna");

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
      {isModalVisible && (
        <TemperatureModal
          onClose={closeModal}
          isVisible={isModalVisible}
          selectedTemp={selectedTemp}
          tempData={TempGraph}
        ></TemperatureModal>
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
            onClick={() => openModal("Temperatura")}
            style={{ cursor: "pointer" }}
          >
            <Frame
              isTitle={true}
              title={"Temperatura"}
              width="105%"
              height="168px"
            >
              <div className={styles.TempGraph}>
                <div className={styles.temp}>
                  <ThemeSwap darkImage={tempLight} lightImage={tempDark} />
                  <span>{lastExternalTemp}ºC</span>
                </div>
              </div>
            </Frame>
          </div>
          <div
            onClick={() => openModal("Temperatura Interna")}
            style={{ cursor: "pointer" }}
          >
            <Frame
              isTitle={true}
              title={"Temperatura Interna"}
              width="105%"
              height="168px"
            >
              <div className={styles.TempGraph}>
                <div className={styles.temp}>
                  <ThemeSwap darkImage={tempLight} lightImage={tempDark} />
                  <span>{lastInternalTemp}ºC</span>
                </div>
              </div>
            </Frame>
          </div>
        </div>
      </div>
      <div className={styles.graphsBot}>
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
        <Frame isTitle={true} title={"Barras"} width="54%" height="320px">
          <HorizontalBarGraph dataBar={dataBar} />
        </Frame>
        <Frame isTitle={true} title={"Gráficos maneiros"} height="auto">
          <div className={styles.dropDownBtns}>
            <DropdownBtn
              title="AQUI Lindo :3"
              width={"230px"}
              onClick={() => {
                resetLines();
              }}
            />
            <DropdownBtn
              title="Average Wind"
              width={"230px"}
              onClick={() => {
                resetLines();
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Molestiae, aut nam soluta libero ut quidem voluptatum nostrum
              atque voluptatibus quisquam quam modi possimus unde deserunt sed
              error similique fugiat! Rem.
            </DropdownBtn>
            <DropdownBtn
              title="Average Wind"
              width={"230px"}
              onClick={() => {
                resetLines();
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Molestiae, aut nam soluta libero ut quidem voluptatum nostrum
              atque voluptatibus quisquam quam modi possimus unde deserunt sed
              error similique fugiat! Rem.
            </DropdownBtn>
          </div>
        </Frame>
      </div>
      <div className={styles.dropDownBtnsBot}>
        <DropdownBtn title="Direção do Vento" width={"504px"}>
          <WindRose direction={0} size={300} />{" "}
        </DropdownBtn>

        <DropdownBtn title="Average Wind" width={"504px"}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
          aut nam soluta libero ut quidem voluptatum nostrum atque voluptatibus
          quisquam quam modi possimus unde deserunt sed error similique fugiat!
          Rem.
        </DropdownBtn>
        <DropdownBtn title="Average Wind" width={"504px"}>
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
