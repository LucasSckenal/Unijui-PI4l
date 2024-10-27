import styles from "./styles.module.scss";
import VerticalBarGraph from "../../GraphicContainer/Graphs/VerticalBarGraph/VerticalBarGraph";
import { useEffect, useState } from "react";

function HumidityModal({ onClose, isVisible, selectedHumidity, humidData }) {
  const [maxDataValue, setMaxDataValue] = useState(0);
  const [selectedLineData, setSelectedLineData] = useState(null);

  useEffect(() => {
    console.log(selectedHumidity + "\n" + humidData);
    if (selectedHumidity && humidData) {
      const humid = humidData.find((humid) => humid.name === selectedHumidity);
      setSelectedLineData(humid);

      if (humid && humid.data.length > 0) {
        setMaxDataValue(Math.max(...humid.data[0]));
      } else {
        setMaxDataValue(0);
      }
    }
  }, [selectedHumidity, humidData]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles.modalOverlay)) {
      onClose();
    }
  };

  return (
    <div
      className={`${styles.modalOverlay} ${
        isVisible ? styles.visible : styles.hidden
      }`}
      onClick={handleOverlayClick}
    >
      <div className={styles.innerModal}>
        <h2>
          Aqui está alguma informação sobre a {selectedHumidity || "indefinida"}
        </h2>
        {selectedLineData && selectedLineData.data.length > 0 && (
          <VerticalBarGraph
            bars={selectedLineData.data[0].map((value) => ({
              value,
              color: selectedLineData.color[0],
            }))}
            xLabels={selectedLineData.xLabels}
            yMax={100}
            width="100%"
            height={300}
            barWidth={20}
            barSpacing={10}
            showDegreeSymbol={false}
          />
        )}
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default HumidityModal;

// Código FERA, favor não copiar, faça o seu próprio truta.
