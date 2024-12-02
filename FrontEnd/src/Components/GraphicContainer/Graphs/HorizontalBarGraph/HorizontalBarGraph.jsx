/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";

const HorizontalBarGraph = ({ dataBar, maxValue }) => {
  const [barData, setBarData] = useState(dataBar);

  useEffect(() => {
    setBarData(dataBar); 
  }, [dataBar]);

  const generateXLabels = () => {
    const labels = [];
    const step = maxValue / 5; 
    for (let i = 0; i <= 5; i++) {
      labels.push(Math.round(step * i));
    }
    return labels;
  };

  return (
    <div className={styles.barchart}>
      {barData.map((item, index) => {
        const percentage = Math.min((item.value / maxValue) * 100, 100); 
        
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
                <span className={styles.tooltip}>{item.value ? item.value : 0}</span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Eixo X com rótulos */}
      <div className={styles.xAxis}>
        {generateXLabels().map((label, index) => (
          <span key={index} className={styles.xLabel}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HorizontalBarGraph;
