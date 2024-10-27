import { useState, useEffect, useRef } from "react";
import styles from "./styles.module.scss";

const VerticalBarGraph = ({
  bars = [],
  xLabels = [],
  yMax = 100,
  width = "100%",
  height = "100%",
  barColor = "steelblue",
  barWidth = 30,
  yLabel = "",
  xLabel = "",
  showDegreeSymbol = false,
  margin = { top: 10, right: 20, bottom: 20, left: 30 },
}) => {
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, value: "" });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [barHeights, setBarHeights] = useState([]); // Estado para armazenar a altura das barras

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        setDimensions({
          width: svgRef.current.clientWidth,
          height: svgRef.current.clientHeight,
        });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const heights = bars.map(value => (value / yMax) * (dimensions.height - margin.top - margin.bottom));
    setBarHeights(heights); // Atualiza a altura das barras
  }, [bars, dimensions.height, yMax]);

  const { width: svgWidth, height: svgHeight } = dimensions;
  const { top, right, bottom, left } = margin;
  const innerWidth = svgWidth - left - right;
  const innerHeight = svgHeight - top - bottom;
  const yStep = innerHeight / 5;

  const handleMouseMove = (event, value, index) => {
    const rect = svgRef.current.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top - 10,
      value,
    });
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, x: 0, y: 0, value: "" });
    setHoveredIndex(null);
  };

  return (
    <div style={{ position: "relative", width, height }}>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className={styles.verticalBarGraph}
      >
        <defs>
          <linearGradient id="bar-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(58, 33, 222, 1)" />
            <stop offset="100%" stopColor="rgba(66, 24, 163, 1)" />
          </linearGradient>
        </defs>

        {/* Eixo Y */}
        {[...Array(6)].map((_, index) => {
          const y = top + index * (innerHeight / 5);
          const value = yMax - (yMax / 5) * index;
          return (
            <g key={`y-label-${index}`}>
              <line
                x1={left}
                y1={y}
                x2={left + innerWidth}
                y2={y}
                stroke="var(--TextGeneral)"
                strokeWidth={0.5}
              />
              <text
                x={left - 10}
                y={y + 5}
                textAnchor="end"
                fontSize="10"
                fill="var(--TextGeneral)"
              >
                {showDegreeSymbol ? `${Math.floor(value)}°C` : Math.floor(value)}
              </text>
            </g>
          );
        })}

        {/* Eixo X */}
        {xLabels.map((label, index) => {
          const x = left + index * (innerWidth / xLabels.length) + barWidth / 2;
          return (
            <g key={`x-label-${index}`}>
              <text
                x={x}
                y={top + innerHeight + 15}
                textAnchor="middle"
                fontSize="10"
                fill="var(--TextGeneral)"
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* Barras Verticais */}
        {bars.map((value, index) => {
          const x = left + index * (innerWidth / bars.length);
          const y = top + innerHeight - (barHeights[index] || 0);

          return (
            <rect
              key={`bar-${index}`}
              x={x}
              y={y}
              width={barWidth}
              height={barHeights[index] || 0} // Usando a altura animada
              fill="url(#bar-gradient)"
              stroke={hoveredIndex === index ? 'var(--TextGeneralAlt)' : 'transparent'}
              strokeWidth={hoveredIndex === index ? 1 : 0}
              onMouseMove={(e) => handleMouseMove(e, value, index)}
              onMouseLeave={handleMouseLeave}
              className={styles.bar} // Classe para a animação
            />
          );
        })}
      </svg>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className={styles.tooltip}
          style={{
            position: "absolute",
            left: tooltip.x,
            top: tooltip.y,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "4px 8px",
            pointerEvents: "none",
            transform: "translate(-50%, -100%)",
            color: "black",
            zIndex: 10,
            whiteSpace: "nowrap",
          }}
        >
          {tooltip.value}
        </div>
      )}
    </div>
  );
};

export default VerticalBarGraph;
