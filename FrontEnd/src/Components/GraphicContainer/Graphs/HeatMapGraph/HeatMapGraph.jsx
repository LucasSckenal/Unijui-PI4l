import { useState } from "react";
/* eslint-disable react/prop-types */

const Heatmap = ({ data, dates, width, height }) => {
  // Estado para controlar o tooltip
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: "" });
  const [hoveredCell, setHoveredCell] = useState(null); // Estado para armazenar a célula em hover

  // Escala de cores
  const colorScale = (value) => {
    if (value < 10) return "#f7fbff"; // Azul claro
    if (value < 30) return "#6baed6"; // Azul médio
    if (value < 50) return "#3182bd"; // Azul forte
    return "#08306b"; // Azul escuro
  };

  // Tamanho das células
  const cellWidth = width / data[0].length;
  const cellHeight = height / data.length;

  // Funções para controlar o tooltip
  const showTooltip = (x, y, content) => {
    setTooltip({ visible: true, x, y, content });
  };

  const hideTooltip = () => {
    setTooltip({ visible: false, x: 0, y: 0, content: "" });
    setHoveredCell(null); // Limpa a célula em hover
  };

  // Função para calcular a posição do valor de cada cor na legenda
  const getColorForValue = (value) => {
    if (value < 10) return "#f7fbff";
    if (value < 30) return "#6baed6";
    if (value < 50) return "#3182bd";
    return "#08306b";
  };

  // Valores mínimo, máximo e intermediário
  const minValue = Math.min(...data.flat());
  const maxValue = Math.max(...data.flat());
  const midValue = (minValue + maxValue) / 2;

  return (
    <div style={{ position: "relative"}}>
      {/* Barra de Legenda acima */}
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
          />
        </svg>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
          <span>{minValue}</span>
          <span>{midValue}</span>
          <span>{maxValue}</span>
        </div>
      </div>

      {/* Heatmap em SVG */}
      <svg
        width={width}
        height={height}
        onMouseLeave={hideTooltip} // Esconde o tooltip ao sair do SVG
      >
        {data.map((row, rowIndex) =>
          row.map((value, colIndex) => {
            const isHovered = hoveredCell === `${rowIndex}-${colIndex}`; // Verifica se a célula está em hover
            return (
              <rect
                key={`${rowIndex}-${colIndex}`}
                x={colIndex * cellWidth}
                y={rowIndex * cellHeight}
                width={cellWidth}
                height={cellHeight}
                fill={colorScale(value)} // Cor com base no valor
                stroke="#fff"
                strokeWidth={isHovered ? 3 : 1} // Aumenta a espessura da borda em hover
                onMouseEnter={(e) => {
                  setHoveredCell(`${rowIndex}-${colIndex}`); // Marca a célula como em hover
                  showTooltip(
                    e.clientX,
                    e.clientY,
                    `Valor: ${value}, Data: ${dates[rowIndex][colIndex]}`
                  );
                }}
                onMouseLeave={() => {
                  setHoveredCell(null); // Remove o hover
                  hideTooltip(); // Esconde o tooltip
                }}
                style={{
                  transition: "stroke-width 0.3s ease", // Suaviza a transição da borda
                }}
              />
            );
          })
        )}
      </svg>

      {/* Tooltip HTML */}
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
            left: tooltip.y,
            top: tooltip.x,
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default Heatmap;
