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

const GraphicContainer = ({
  visibleLines,
  setVisibleLines,
  lineDatas = [],
  line,
}) => {
  const [hidden, setHidden] = useState(false);

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

  return (
    <section className={styles.graphs}>
      <div className={styles.graphsTop}>
        <Frame isTitle={true} title="Principal" width="78.2%" height="350px">
          <LineGraph
            lines={Object.keys(visibleLines)
              .map((key, index) => {
                if (visibleLines[key]) {
                  const lineData = lineDatas.find((item) => item.name === line); // Acessando os dados da linha
                  return {
                    data: lineData ? lineData.data[index] : [], // Acessando os dados da linha com base no índice
                    strokeColor:
                      key === "line1"
                        ? "#d40d77"
                        : key === "line2"
                        ? "#14ccc9"
                        : "#dbd10f", // Cores para as linhas
                    fillColor:
                      key === "line1"
                        ? "rgba(212, 13, 119, 0.8)"
                        : key === "line2"
                        ? "rgba(20, 204, 201, 0.8)"
                        : "rgba(219, 209, 15, 0.8)", // Cores para o preenchimento
                  };
                }
                return null; // Se a linha não estiver visível, retorna null
              })
              .filter(Boolean)} // Filtrando para remover valores nulos
            width="100%"
            height={250}
          />
        </Frame>
        <div className={styles.tempContainer}>
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

      <div className={styles.graphsBot}>
        {!hidden && (
          <Frame
            isTitle={true}
            title={"Velocidade do Vento"}
            width="23%"
            height="320px"
          >
            <RadialBarCharts value={150} />
          </Frame>
        )}
        <Frame isTitle={true} title={"Barras"} width="54%" height="320px">
          <HorizontalBarGraph />
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
          <WindRose direction={270} size={300} />{" "}
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
