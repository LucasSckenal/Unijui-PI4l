import { useState, useEffect, useRef } from "react";
import styles from "./styles.module.scss";

const VerticalBarGraph = ({
  bars = [],
  xLabels = [],
  yMax = 100,
  width = "100%",
  height = "100%",
  barWidth = 10,
  barSpacing = 5,
  yLabel = "",
  xLabel = "",
  showDegreeSymbol = false,
  margin = { top: 10, right: 20, bottom: 20, left: 30 },
}) => {
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    value: null,
  });

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

  const { width: svgWidth, height: svgHeight } = dimensions;
  const { top, right, bottom, left } = margin;
  const innerWidth = svgWidth - left - right;
  const innerHeight = svgHeight - top - bottom;
  const yStep = innerHeight / 5;

  const handleMouseEnter = (event, value, x, y) => {
    setTooltip({
      visible: true,
      x,
      y,
      value: showDegreeSymbol ? `${value}°C` : value,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  return (
    <div style={{ position: "relative", width, height }}>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${svgWidth - 10} ${svgHeight}`}
        className={styles.barGraph}
      >
        {/* Eixo Y */}
        {[...Array(6)].map((_, index) => {
          const y = top + index * yStep;
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
                  ? `${Math.floor(value)}°C`
                  : Math.floor(value)}{" "}
              </text>
            </g>
          );
        })}

        {/* Eixo X */}
        {xLabels.map((label, index) => {
          const x = left + (index / (xLabels.length - 1)) * innerWidth;
          return (
            <g key={`x-label-${index}`}>
              <line
                x1={x}
                y1={top}
                x2={x}
                y2={top + innerHeight}
                stroke="var(--TextGeneral)"
                strokeWidth={0.5}
              />
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

        {/* Barras */}
        {bars.map((bar, barIndex) => {
          const x = left + barIndex * (barWidth + barSpacing);
          const barHeight = (bar.value / yMax) * innerHeight;
          const y = top + innerHeight - barHeight;

          return (
            <g key={`bar-${barIndex}`}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={bar.color}
                onMouseEnter={(event) =>
                  handleMouseEnter(event, bar.value, x, y)
                }
                onMouseLeave={handleMouseLeave}
              />
            </g>
          );
        })}
      </svg>

      {/* Tooltip com símbolo de graus Celsius */}
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
          }}
        >
          {tooltip.value}
        </div>
      )}
    </div>
  );
};

export default VerticalBarGraph;
