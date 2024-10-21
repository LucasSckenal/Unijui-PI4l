import { useState, useEffect, useRef } from "react";
import styles from "./styles.module.scss";

const LineGraph = ({
  lines = [],
  width = "100%",
  height = "100%",
  strokeWidth = 2,
  pointBorderColor = "white",
  pointBorderWidth = 0.5,
  lineBorderColor = "white",
  lineBorderWidth = 0.001,
  xLabels = [],
  yMax = 100,
  yLabel = "",
  xLabel = "",
  margin = { top: 10, right: 10, bottom: 20, left: 20 },
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
    setTooltip({ visible: true, x, y, value });
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
        className={styles.lineGraph}
      >
        <defs>
          {lines.map((line, index) => (
            <linearGradient
              key={`gradient-${index}`}
              id={`gradient-${index}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={line.fillColor} stopOpacity="0.8" />
              <stop
                offset="100%"
                stopColor={line.fillColor}
                stopOpacity="0.2"
              />
            </linearGradient>
          ))}
        </defs>

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
                {value}
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

        {lines.map((line, lineIndex) => {
          const maxValue = Math.max(...line.data);
          const points = line.data
            .map((value, index) => {
              const x = left + (index / (line.data.length - 1)) * innerWidth;
              const y = top + innerHeight - (value / maxValue) * innerHeight;
              return `${x},${y}`;
            })
            .join(" ");

          const fillPoints = `${left},${top + innerHeight} ${points} ${
            left + innerWidth
          },${top + innerHeight}`;

          return (
            <g key={`line-${lineIndex}`}>
              <polygon
                points={fillPoints}
                fill={`url(#gradient-${lineIndex})`}
              />
              <polyline
                points={points}
                fill="none"
                stroke={line.strokeColor}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
              />
            </g>
          );
        })}

        {/* Pontos com borda */}
        {lines.map((line, lineIndex) =>
          line.data.map((value, index) => {
            const x = left + (index / (line.data.length - 1)) * innerWidth;
            const y =
              top +
              innerHeight -
              (value / Math.max(...line.data)) * innerHeight;

            return (
              <g key={`point-${lineIndex}-${index}`}>
                <circle
                  cx={x}
                  cy={y}
                  r={4}
                  fill={line.strokeColor}
                  stroke={pointBorderColor}
                  strokeWidth={pointBorderWidth}
                  onMouseEnter={(event) => handleMouseEnter(event, value, x, y)}
                  onMouseLeave={handleMouseLeave}
                />
              </g>
            );
          })
        )}
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
          }}
        >
          {tooltip.value}
        </div>
      )}
    </div>
  );
};

export default LineGraph;
