import styles from "./styles.module.scss";
import { useState } from "react";

const GraphicsBtn = ({ name, onClick }) => {
  const [showGraphs, setShowGraphs] = useState(true);

  const toggleGraphs = () => {
    setShowGraphs((prev) => !prev);
    onClick(); 
  };

  return (
    <div className={styles.graphsInputs} onClick={toggleGraphs}>
      <p>{showGraphs ? `Ocultar ${name}` : `Mostrar ${name}`}</p>
      <div
        className={showGraphs ? styles.toggleChecked : styles.toggleUnchecked}
      >
        <div className={styles.toggleBall}></div>
      </div>
    </div>
  );
};

export default GraphicsBtn;
