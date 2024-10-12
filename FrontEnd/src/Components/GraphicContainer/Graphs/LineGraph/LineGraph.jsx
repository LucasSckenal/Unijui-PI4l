import { useState } from "react";
import styles from "./styles.module.scss";

const LineGraph = ({
  lines = [], // Array de objetos de linhas {data: [], strokeColor: "", fillColor: ""}
  width = "500", // Agora aceita string
  height = "300", // Agora aceita string
  strokeWidth = 2,
}) => {
  const numericWidth = parseInt(width, 10);
  const numericHeight = parseInt(height, 10);

  const [visibility, setVisibility] = useState(
    lines.map(() => true) // Inicia com todas as linhas visíveis
  );

  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    value: 0,
  });

  
  const handleMouseEnter = (event, value) => {
    const rect = event.target.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY - 40,
      value,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  return (
    <div style={{ position: "relative", width, height }}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${numericWidth} ${numericHeight}`}
        className={styles.lineGraph}
      >
        {/* Renderiza cada linha de dados */}
        {lines.map((line, lineIndex) => {
          if (!visibility[lineIndex]) return null; // Não renderiza se a linha estiver invisível

          const maxValue = Math.max(...line.data);
          const points = line.data
            .map((value, index) => {
              const x = (index / (line.data.length - 1)) * numericWidth;
              const y = numericHeight - (value / maxValue) * numericHeight;
              return `${x},${y}`;
            })
            .join(" ");

          const fillPoints = `0,${numericHeight} ${points} ${numericWidth},${numericHeight}`;

          return (
            <g key={lineIndex}>
              {/* Área preenchida */}
              <polygon points={fillPoints} fill={line.fillColor} />

              {/* Linha */}
              <polyline
                points={points}
                fill="none"
                stroke={line.strokeColor}
                strokeWidth={strokeWidth}
              />

              {/* Pontos nas intersecções */}
              {line.data.map((value, index) => {
                const x = (index / (line.data.length - 1)) * numericWidth;
                const y = numericHeight - (value / maxValue) * numericHeight;
                return (
                  <g key={index}>
                    <circle
                      cx={x}
                      cy={y}
                      r={4}
                      fill={line.strokeColor}
                      onMouseEnter={(event) => handleMouseEnter(event, value)}
                      onMouseLeave={handleMouseLeave}
                    />
                    {/* Texto acima do ponto */}
                    {tooltip.visible && tooltip.value === value && (
                      <text
                        x={x}
                        y={y - 10}
                        fill="var(--TextGeneral)"
                        fontSize="12"
                        textAnchor="middle"
                      >
                        {value}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default LineGraph;
