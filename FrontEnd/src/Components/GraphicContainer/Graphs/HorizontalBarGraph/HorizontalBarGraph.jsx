import styles from "./styles.module.scss";

const data = [
  { label: "Category 1", value: 80 },
  { label: "Category 2", value: 50 },
  { label: "Category 3", value: 70 },
  { label: "Category 4", value: 90 },
];

const HorizontalBarGraph = () => {
  return (
    <div className={styles.barchart}>
      {data.map((item, index) => (
        <div key={index} className={styles.barContainer}>
          <span className={styles.barLabel}>{item.label}</span>
          <div className={styles.bar}>
            <div
              className={styles.barFill}
              style={{ width: `${item.value}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HorizontalBarGraph;
