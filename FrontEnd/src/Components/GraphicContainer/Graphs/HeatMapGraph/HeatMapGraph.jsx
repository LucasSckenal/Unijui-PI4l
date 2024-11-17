import { useState } from "react";
/* eslint-disable react/prop-types */

const Heatmap = ({ data, dates, width, height }) => {
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: "" });
  const [hoveredCell, setHoveredCell] = useState(null);

  const colorScale = (value) => {
    if (value < 10) return "#f7fbff";
    if (value < 30) return "#6baed6";
    if (value < 50) return "#3182bd";
    return "#08306b";
  };

  const cellWidth = width / data[0].length;
  const cellHeight = height / data.length;

  const showTooltip = (x, y, content) => {
    setTooltip({ visible: true, x, y, content });
  };

  const hideTooltip = () => {
    setTooltip({ visible: false, x: 0, y: 0, content: "" });
    setHoveredCell(null);
  };

  const getColorForValue = (value) => {
    if (value < 10) return "#f7fbff";
    if (value < 30) return "#6baed6";
    if (value < 50) return "#3182bd";
    return "#08306b";
  };

  const minValue = Math.min(...data.flat());
  const maxValue = Math.max(...data.flat());
  const midValue = (minValue + maxValue) / 2;

  const totalWidth = width + 100;
  const totalHeight = height + 100;

  return (
    <div style={{ position: "relative" }}>
      <div style={{ width: "100%", height: "20px", marginBottom: "30px" }}>
        <svg width="100%" height="100%">
          <defs>
            <linearGradient id="colorGradient" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor={getColorForValue(minValue)} />
              <stop offset="50%" stopColor={getColorForValue(midValue)} />
              <stop offset="100%" stopColor={getColorForValue(maxValue)} />
            </linearGradient>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#colorGradient)"
            stroke="var(--DetailsBg)"
            strokeWidth="2" 
            rx="8"  
          />
        </svg>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
          <span>{minValue}</span>
          <span>{midValue}</span>
          <span>{maxValue}</span>
        </div>
      </div>

      <svg
        width={totalWidth}
        height={totalHeight}
        onMouseLeave={hideTooltip}
        style={{
          display: "block",
          margin: "0 auto", 
        }}
      >
        {/* Labels do eixo Y */}
        {data.map((_, rowIndex) => (
          <text
            key={`y-label-${rowIndex}`}
            x={40}
            y={rowIndex * cellHeight + cellHeight + 20}
            dy=".35em"
            fontSize="12px"
            fill="var(--TextGeneral)"
            textAnchor="end"
            style={{
              userSelect: "none",
              pointerEvents: "none", // Impede que o texto interfira no hover
            }}
          >
            {`Y${rowIndex + 1}`} {/* Substitua por nomes reais, se necessário */}
          </text>
        ))}

        {/* Labels do eixo X */}
        {data[0].map((_, colIndex) => (
          <text
            key={`x-label-${colIndex}`}
            x={colIndex * cellWidth + cellWidth / 2 + 40}  // Ajuste para centralizar
            y={height + 63}  // Ajustando a posição Y para dar um espaço extra
            fontSize="12px"
            fill="var(--TextGeneral)"
            textAnchor="middle"
            transform={`rotate(-45, ${colIndex * cellWidth + cellWidth / 2 + 50}, ${height + 50})`} // Ponto de rotação ajustado
            style={{
              userSelect: "none",
              pointerEvents: "none", // Impede que o texto interfira no hover
            }}
          >
            {`X${colIndex + 1}`}
          </text>
        ))}

        {/* Heatmap quadrados e valores */}
        <g transform="translate(50, 50)"> {/* Desloca o gráfico para a direita e para baixo */}
          {data.map((row, rowIndex) =>
            row.map((value, colIndex) => {
              const isHovered = hoveredCell === `${rowIndex}-${colIndex}`;
              return (
                <g key={`${rowIndex}-${colIndex}`}>
                  <rect
                    x={colIndex * cellWidth}
                    y={rowIndex * cellHeight}
                    width={cellWidth}
                    height={cellHeight}
                    fill={colorScale(value)}
                    stroke="#fff"
                    strokeWidth={isHovered ? 3 : 1}
                    onMouseEnter={(e) => {
                      setHoveredCell(`${rowIndex}-${colIndex}`);
                      // Calculando posição relativa do mouse no SVG
                      const svgRect = e.target.closest('svg').getBoundingClientRect();
                      const xPos = e.clientX - svgRect.left;
                      const yPos = e.clientY - svgRect.top;
                      showTooltip(xPos, yPos, `Valor: ${value}, Data: ${dates[rowIndex][colIndex]}`);
                    }}
                    onMouseLeave={() => {
                      setHoveredCell(null);
                      hideTooltip();
                    }}
                    style={{
                      transition: "stroke-width 0.3s ease",
                    }}
                  />
                  <text
                    x={colIndex * cellWidth + cellWidth / 2}
                    y={rowIndex * cellHeight + cellHeight / 2}
                    dy=".35em"
                    textAnchor="middle"
                    fontSize="20px"
                    fontWeight="bold"
                    fill="white" // Texto branco para contraste
                    stroke="black" // Borda preta para maior visibilidade
                    strokeWidth="0.5"
                    style={{
                      userSelect: "none",
                      pointerEvents: "none", // Impede que o texto interfira no hover
                    }} 
                  >
                    {value}
                  </text>
                </g>
              );
            })
          )}
        </g>
      </svg>

      {tooltip.visible && (
        <div
          style={{
            width: "50%",
            margin: "10px auto 0",
            fontWeight: "bold",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            padding: "5px",
            background: "var(--ModalBtn)",
            borderRadius: "4px",
            pointerEvents: "none",
            border: "1px solid var(--TextGeneral)",
            whiteSpace: "nowrap",
            textAlign: "center",
            left: tooltip.x,
            top: tooltip.y,
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default Heatmap;
