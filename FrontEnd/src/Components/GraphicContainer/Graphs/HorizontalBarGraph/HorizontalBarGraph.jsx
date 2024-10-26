import styles from "./styles.module.scss";

const data = [
  { label: "Luminosity", value: 10 },
  { label: "Ultra Violet", value: 50 },
];

const getBarColor = (value) => {
  if (value <= 33) return "#3CC27F";
  if (value <= 66) return "#E6FF2B";
  return "#FA3E3E";
};

const HorizontalBarGraph = ({ data }) => {
  return (
    <div className={styles.barchart}>
      {data.map((item, index) => (
        <div key={index} className={styles.barContainer}>
          <span className={styles.barLabel}>{item.label}</span>
          <div className={styles.bar}>
            <div
              className={styles.barFill}
              style={{
                width: `${item.value}%`,
                backgroundColor: getBarColor(item.value),
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HorizontalBarGraph;
