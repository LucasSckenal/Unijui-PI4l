import DropdownBtn from "../../Components/Buttons/DropDownBtn/dropDownBtn.jsx";
import HorizontalBarGraph from "./Graphs/HorizontalBarGraph/HorizontalBarGraph.jsx";
import LineGraph from "./Graphs/LineGraph/LineGraph.jsx";
import tempDark from "../../assets/thermometer-temperature.svg";
import tempLight from "../../assets/thermometer-temperature-white.png"
import styles from "./styles.module.scss";
import Frame from "../Utilities/Frame/frame.jsx";
import RadialBarCharts from "./Graphs/SpeedometerGraph/SpeedometerGraph.jsx";
import { useState, useEffect } from "react";
import ThemeSwap from "../ThemeSwap/themeSwap.jsx";

const GraphicContainer = ({ visibleLines }) => {
  const [hidden, setHidden] = useState(false);

  const dataPizza = [
    { value: 40, color: "#FA3E3E" },
    { value: 30, color: "#0056b3" },
    { value: 20, color: "#3C57C2" },
    { value: 10, color: "#3CC2AC" },
  ];

  const dataLine = [35, 30, 50, 70, 90, 80, 60, 40, 80, 50];

  useEffect(() => {
    const handleHidden = () => {
      setHidden(window.innerWidth <= 720);
    };

    handleHidden();

    window.addEventListener("resize", handleHidden);
  });

  return (
    <section className={styles.graphs}>
      <div className={styles.graphsTop}>
        <Frame
          isTitle={true}
          title="Principal"
          width="78.2%"
          height="350px"
        >
          <LineGraph
            lines={[
              visibleLines.line1 && {
                data: [10, 20, 30, 40],
                strokeColor: "#ff0000",
                fillColor: "rgba(255, 0, 0, 0.2)",
              },
              visibleLines.line2 && {
                data: [40, 30, 20, 10],
                strokeColor: "#00ff00",
                fillColor: "rgba(0, 255, 0, 0.2)",
              },
              visibleLines.line3 && {
                data: [20, 30, 25, 35],
                strokeColor: "#0000ff",
                fillColor: "rgba(0, 0, 255, 0.2)",
              },
            ].filter(Boolean)}
            width="100%"
            height={250}
          />
        </Frame>
        <div className={styles.tempContainer}>
          <Frame
            isTitle={true}
            title={"Temperatura"}
            width="110%"
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
            width="110%"
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
        {hidden ? null : <Frame
          isTitle={true}
          title={"Velocidade do Vento"}
          width="23%"
          height="320px"
        >
          <RadialBarCharts value={150} />
        </Frame>}
          <Frame
            isTitle={true}
            title={"Barras"}
            width="54%"
            height="320px"
          >
            <div className={styles.graphBar}>
            <HorizontalBarGraph/>
            </div>
          </Frame>
        <Frame
          isTitle={true}
          title={"Gráficos maneiros"}
          width="15%"
          height="auto"
        >
          <div className={styles.dropDownBtns}>
            <DropdownBtn title="Average Wind" width={"230px"}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Molestiae, aut nam soluta libero ut quidem voluptatum nostrum
              atque voluptatibus quisquam quam modi possimus unde deserunt sed
              error similique fugiat! Rem.
            </DropdownBtn>
            <DropdownBtn title="Average Wind" width={"230px"}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Molestiae, aut nam soluta libero ut quidem voluptatum nostrum
              atque voluptatibus quisquam quam modi possimus unde deserunt sed
              error similique fugiat! Rem.
            </DropdownBtn>
            <DropdownBtn title="Average Wind" width={"230px"}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Molestiae, aut nam soluta libero ut quidem voluptatum nostrum
              atque voluptatibus quisquam quam modi possimus unde deserunt sed
              error similique fugiat! Rem.
            </DropdownBtn>
          </div>
        </Frame>
      </div>
      <div className={styles.dropDownBtnsBot}>
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
