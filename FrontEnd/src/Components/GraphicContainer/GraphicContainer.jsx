import DropdownBtn from "../../Components/Buttons/DropDownBtn/dropDownBtn.jsx";
import HorizontalBarGraph from "./Graphs/HorizontalBarGraph/HorizontalBarGraph.jsx";
import LineGraph from "./Graphs/LineGraph/LineGraph.jsx";
import temp from "../../assets/thermometer-temperature.svg";
import styles from "./styles.module.scss";
import Frame from "../Utilities/Frame/frame.jsx";
import RadialBarCharts from "./Graphs/SpeedometerGraph/SpeedometerGraph.jsx";

const GraphicContainer = ({ visibleLines }) => {
  const dataPizza = [
    { value: 40, color: "#FA3E3E" },
    { value: 30, color: "#0056b3" },
    { value: 20, color: "#3C57C2" },
    { value: 10, color: "#3CC2AC" },
  ];

  const dataLine = [35, 30, 50, 70, 90, 80, 60, 40, 80, 50];

  return (
    <section className={styles.graphs}>
      <div className={styles.graphsTop}>
        <Frame
          isTitle={true}
          title="Graficos Principal"
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
            width={1260}
            height={250}
          />
        </Frame>
        <div className={styles.tempContainer}>
          <Frame
            isTitle={true}
            title={"Graficos Temperatura"}
            width="110%"
            height="168px"
          >
            <div className={styles.TempGraph}>
              <div className={styles.temp}>
                <img src={temp} alt="" />
                <span>19ºC</span>
              </div>
            </div>
          </Frame>
          <Frame
            isTitle={true}
            title={"Graficos Temperatura interna"}
            width="110%"
            height="168px"
          >
            <div className={styles.TempGraph}>
              <div className={styles.temp}>
                <img src={temp} alt="" />
                <span>22ºC</span>
              </div>
            </div>
          </Frame>
        </div>
      </div>

      <div className={styles.graphsBot}>
        <Frame
          isTitle={true}
          title={"Gráfico de Medidor"}
          width="23%"
          height="320px"
        >
          <RadialBarCharts value={150} />
        </Frame>
        <Frame
          isTitle={true}
          title={"Gráfico de Barras"}
          width="54%"
          height="320px"
        >
          <HorizontalBarGraph></HorizontalBarGraph>
        </Frame>
        <Frame
          isTitle={true}
          title={"Graficos maneiros"}
          width="15.6%"
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
