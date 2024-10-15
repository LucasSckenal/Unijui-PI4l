import { useState, useEffect, useRef } from "react";
import styles from "./styles.module.scss";

const LineGraph = ({
  lines = [], // Array de objetos de linhas {data: [], strokeColor: "", fillColor: ""}
  width = "100%", // Largura em porcentagem
  height = "100%", // Altura em porcentagem
  strokeWidth = 2,
}) => {
  const svgRef = useRef(null); // Referência ao SVG para pegar largura e altura reais
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const [visibility, setVisibility] = useState(
    lines.map(() => true) // Inicia com todas as linhas visíveis
  );

  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    value: 0,
  });

  // Atualiza as dimensões do SVG dinamicamente
  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        setDimensions({
          width: svgRef.current.clientWidth,
          height: svgRef.current.clientHeight,
        });
      }
    };

    updateDimensions(); // Chama ao montar o componente
    window.addEventListener("resize", updateDimensions); // Atualiza ao redimensionar

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

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

  const { width: svgWidth, height: svgHeight } = dimensions;

  return (
    <div style={{ position: "relative", width, height }}>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className={styles.lineGraph}
      >
        {lines.map((line, lineIndex) => {
          if (!visibility[lineIndex]) return null;

          const maxValue = Math.max(...line.data);
          const points = line.data
            .map((value, index) => {
              const x = (index / (line.data.length - 1)) * svgWidth;
              const y = svgHeight - (value / maxValue) * svgHeight;
              return `${x},${y}`;
            })
            .join(" ");

          const fillPoints = `0,${svgHeight} ${points} ${svgWidth},${svgHeight}`;

          return (
            <g key={lineIndex}>
              <polygon points={fillPoints} fill={line.fillColor} />
              <polyline
                points={points}
                fill="none"
                stroke={line.strokeColor}
                strokeWidth={strokeWidth}
              />
              {line.data.map((value, index) => {
                const x = (index / (line.data.length - 1)) * svgWidth;
                const y = svgHeight - (value / maxValue) * svgHeight;
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
