/* eslint-disable react/prop-types */
import styles from "./styles.module.scss";
import { useEffect, useRef, useState } from "react";
import { getMaxDataValue } from "../../../utils/MaxDataValue";
import LineGraph from "../../GraphicContainer/Graphs/LineGraph/LineGraph";
import VerticalBarGraph from "../../GraphicContainer/Graphs/VerticalBarGraph/VerticalBarGraph";

function GraphModal({
  onClose,
  isVisible,
  title,
  graphType,
  graphData,
  degreeSymbol,
}) {
  const modalRef = useRef();
  const [maxDataValue, setMaxDataValue] = useState(null);

  const handleOverlayClick = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  useEffect(() => {
    if (graphData && graphData.data && graphData.data[0]) {
      const calculatedMaxValue = getMaxDataValue(graphData.data[0]);
      setMaxDataValue(calculatedMaxValue);
    }
  }, [graphData]);

  const renderGraph = () => {
    const props = {
      xLabels: graphData.xLabels,
      graphData: graphData.data,
      yMax: maxDataValue,
      width: "100%",
      height: 250,
      showDegreeSymbol: !!degreeSymbol,
    };

    if (!graphData || !graphData.data || !graphData.data[0]) {
      return <div>Dados não disponíveis</div>;
    }

    if (graphType === "line") {
      return (
        <LineGraph
          {...props}
          lines={[
            {
              data: graphData.data[0],
              strokeColor: graphData.color[0],
              fillColor: graphData.rgba[0],
            },
          ]}
          degreeSymbol={degreeSymbol}
        />
      );
    } else if (graphType === "bar") {
      return (
        <VerticalBarGraph
          {...props}
          bars={graphData.data[0]}
          gradientStartColor={graphData.gradientStartColor}
          gradientEndColor={graphData.gradientEndColor}
          gradientId={graphData.id[0]}
          degreeSymbol={degreeSymbol}
        />
      );
    }
    return null;
  };

  return (
    <div
      className={`${styles.modalOverlay} ${
        isVisible ? styles.visible : styles.hidden
      }`}
      ref={modalRef}
      onClick={handleOverlayClick}
    >
      <div className={styles.innerModal}>
        <h2>{title || "Informações"}</h2>
        {renderGraph()}
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default GraphModal;
