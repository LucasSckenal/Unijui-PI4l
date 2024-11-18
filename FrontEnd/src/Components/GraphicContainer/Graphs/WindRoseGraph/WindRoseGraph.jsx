/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./styles.module.scss";

const WindRose = ({ direction = 0, size = 200 }) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

  // Calcula a rotação da seta com base na direção do vento (0 a 360 graus)
  const arrowRotation = `rotate(${direction}deg)`;

  return (
    <div
      className={styles.windRose}
      style={{ width: size, height: size }}
    >
      <div className={styles.compass}>
        {directions.map((dir, index) => (
          <div
            key={dir}
            className={`${styles.direction} ${styles[`dir-${index}`]}`}
          >
            {dir}
          </div>
        ))}
        <div className={styles.arrow} style={{ transform: arrowRotation }} />
      </div>
    </div>
  );
};

export default WindRose;
