import styles from "./styles.module.scss";

const HorizontalBarGraph = ({ dataBar }) => {
  return (
    <div className={styles.barchart}>
      {dataBar.map((item, index) => (
        <div key={index} className={styles.barContainer}>
          <span className={styles.barLabel}>{item.label}</span>
          <div className={styles.bar}>
            <div
              className={styles.barFill}
              style={{
                width: `${item.value}%`,
                background: `${item.backgroundColor}`,
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HorizontalBarGraph;
