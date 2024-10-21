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
import PieChart from "./Graphs/PizzaGraph/PizzaGraph.jsx";

const GraphicContainer = ({
  visibleLines,
  setVisibleLines,
  lineDatas = [],
  line,
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
    return () => window.removeEventListener("resize", handleHidden); // Remova o ouvinte ao desmontar
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

  const pieData = [
    { value: 40, color: "#ff0000" }, 
    { value: 30, color: "#00ff00" }, 
    { value: 20, color: "#0000ff" }, 
    { value: 10, color: "#ffff00" }, 
  ];

  const openModal = (tempType) => {
    setSelectedTemp(tempType);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <section className={styles.graphs}>
      {isModalVisible && (
        <TemperatureModal
          onClose={closeModal}
          isVisible={isModalVisible}
          selectedTemp={selectedTemp}
        >
          <PieChart data={pieData} />
        </TemperatureModal>
      )}

      <div className={styles.graphsTop}>
        <Frame isTitle={true} title="Principal" width="78.2%" height="350px">
          <LineGraph
            lines={Object.keys(visibleLines)
              .map((key, index) => {
                if (visibleLines[key]) {
                  const lineData = lineDatas.find((item) => item.name === line);
                  return {
                    data: lineData ? lineData.data[index] : [],
                    strokeColor:
                      key === "line1"
                        ? lineData.color[index]
                        : key === "line2"
                        ? lineData.color[index]
                        : lineData.color[index],
                    fillColor:
                      key === "line1"
                        ? lineData.rgba[index]
                        : key === "line2"
                        ? lineData.color[index]
                        : lineData.color[index],
                  };
                }
                return null;
              })
              .filter(Boolean)}
            width="100%"
            height={250}
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
                  <span>19ºC</span>
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
                  <span>22ºC</span>
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
