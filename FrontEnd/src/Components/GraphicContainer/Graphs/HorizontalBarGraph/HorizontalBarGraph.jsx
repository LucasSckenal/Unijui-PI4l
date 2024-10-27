import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";

const HorizontalBarGraph = ({ dataBar, maxValue }) => {
  const [barData, setBarData] = useState(dataBar);

  useEffect(() => {
    // Atualiza os dados da barra e aciona animação ao receber novos dados
    setBarData(dataBar);
  }, [dataBar]);

  return (
    <div className={styles.barchart}>
      {barData.map((item, index) => {
        const percentage = Math.min((item.value / maxValue) * 100, 100); // Limita a 100%

        return (
          <div key={index} className={styles.barContainer}>
            <span className={styles.barLabel}>{item.label}</span>
            <div className={styles.bar}>
              <div
                className={styles.barFill}
                style={{
                  width: `${percentage}%`,
                  background: `${item.backgroundColor}`,
                }}
              >
                <span className={styles.tooltip}>{item.value}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HorizontalBarGraph;
