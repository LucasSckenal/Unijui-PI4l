import { useState, useEffect, useRef } from "react";
import styles from "./styles.module.scss";

const VerticalBarGraph = ({
  bars = [],
  xLabels = [],
  yMax = 100,
  width = "100%",
  height = "100%",
  barWidth = 30, // Largura inicial da barra
  degreeSymbol = "",
  showDegreeSymbol = false,
  margin = { top: 10, right: 20, bottom: 20, left: 30 },
  gradientStartColor = "rgba(58, 33, 222, 1)",
  gradientEndColor = "rgba(66, 24, 163, 1)",
  gradientId,
  tooltipStyle = "style1",
  minSpacing = 5, // Espaço mínimo entre as barras
}) => {
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    value: "",
  });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [barHeights, setBarHeights] = useState([]);

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
    const heights = bars.map(
      (value) =>
        (value / yMax) * (dimensions.height - margin.top - margin.bottom)
    );
    setBarHeights(heights);
  }, [bars, dimensions.height, yMax]);

  const { width: svgWidth, height: svgHeight } = dimensions;
  const { top, right, bottom, left } = margin;
  const innerWidth = svgWidth - left - right;
  const innerHeight = svgHeight - top - bottom;

  // Espaço total necessário para todas as barras com espaçamento mínimo
  const totalSpacing = minSpacing * (xLabels.length - 1); // Ajustado para xLabels.length
  const totalBarsWidth = xLabels.length * barWidth; // Ajustado para xLabels.length
  const availableWidth = innerWidth - totalSpacing; // Espaço disponível para as barras

  // Calcular a largura das barras para preencher o espaço disponível
  const adjustedBarWidth = availableWidth / xLabels.length;

  // Calcular a posição de cada barra para distribuí-las igualmente
  const totalBarWidth = adjustedBarWidth * xLabels.length + totalSpacing;

  const xOffset =
    totalBarWidth < innerWidth ? (innerWidth - totalBarWidth) / 2 : 0;

  const handleMouseMove = (event, value, index) => {
    const rect = svgRef.current.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top - 10,
      value: showDegreeSymbol ? `${value}${degreeSymbol}` : value,
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
        viewBox={`-10 0 ${svgWidth} ${svgHeight}`}
        className={styles.verticalBarGraph}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={gradientStartColor} />
            <stop offset="100%" stopColor={gradientEndColor} />
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
                {showDegreeSymbol
                  ? `${Math.floor(value)}${degreeSymbol}`
                  : Math.floor(value)}
              </text>
            </g>
          );
        })}

        {/* Eixo X (agora com as labels abaixo das barras) */}
        {xLabels.map((label, index) => {
          const x =
            left +
            xOffset +
            index * (adjustedBarWidth + minSpacing) +
            adjustedBarWidth / 2;
          const y = top + innerHeight + 15; // Ajustando a posição Y para estar abaixo das barras
          return (
            <g key={`x-label-${index}`}>
              <text
                x={x}
                y={y}
                textAnchor="middle"
                fontSize="10"
                fill="var(--TextGeneral)"
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* Barras Verticais (renderizando apenas conforme xLabels.length) */}
        {xLabels.map((_, index) => {
          const value = bars[index] || 0; // Garantir que o valor da barra seja usado corretamente
          const x = left + xOffset + index * (adjustedBarWidth + minSpacing);
          const y = top - 1 + innerHeight - (barHeights[index] || 0);

          return (
            <rect
              key={`bar-${index}`}
              x={x}
              y={y}
              width={adjustedBarWidth}
              height={barHeights[index] || 0}
              fill={`url(#${gradientId})`}
              stroke={
                hoveredIndex === index ? "var(--TextGeneralAlt)" : "transparent"
              }
              strokeWidth={hoveredIndex === index ? 1 : 0}
              onMouseMove={(e) => handleMouseMove(e, value, index)}
              onMouseLeave={handleMouseLeave}
              className={styles.bar}
            />
          );
        })}
      </svg>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className={`${styles.tooltip} ${
            tooltipStyle === "style1"
              ? styles["tooltip-style1"]
              : styles["tooltip-style2"]
          }`}
          style={{
            left: tooltip.x,
            top: tooltip.y,
          }}
        >
          {tooltip.value}
        </div>
      )}
    </div>
  );
};

export default VerticalBarGraph;
