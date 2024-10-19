/* eslint-disable react/prop-types */
import styles from "./styles.module.scss";
import { useState } from "react";

const GraphicsOptions = ({ options }) => {
   const [showGraphs, setShowGraphs] = useState(true);

    return (
      <div className={styles.optionsContainer}>
        {options.map((option) => (
          <button key={option} className={styles.optionButton}>
            {option}
          </button>
        ))}
      </div>
    );
  };

export default GraphicsOptions;