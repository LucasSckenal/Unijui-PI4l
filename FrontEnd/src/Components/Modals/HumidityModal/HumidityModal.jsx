import styles from "./styles.module.scss";
import LineGraph from "../../GraphicContainer/Graphs/LineGraph/LineGraph";
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
        // Assumindo que humid.data[0] é um array
        setMaxDataValue(Math.max(...humid.data[0]));
      } else {
        setMaxDataValue(0); // Reseta o maxDataValue se não houver dados
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
          <LineGraph
            lines={[
              {
                data: selectedLineData.data[0],
                strokeColor: selectedLineData.color[0],
                fillColor: selectedLineData.rgba[0],
              },
            ]}
            xLabels={selectedLineData.xLabels}
            yMax={maxDataValue}
            width="100%"
            height={250}
            showDegreeSymbol={true}
          />
        )}
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default HumidityModal;

// Código FERA, favor não copiar, faça o seu próprio truta.