import styles from "./styles.module.scss";

const LineGraph = ({ data, width = 500, height = 300, strokeColor = '#3b82f6', fillColor = 'rgba(59, 130, 246, 0.2)', strokeWidth = 2 }) => {
  // Determinar o valor máximo no dataset para escalar o gráfico
  const maxValue = Math.max(...data);
  
  // Gerar os pontos (x, y) no gráfico
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - (value / maxValue) * height;
      return `${x},${y}`;
    })
    .join(' ');

  // Gerar o preenchimento do gráfico (área abaixo da linha)
  const fillPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={styles.lineGraph}>
      {/* Área preenchida */}
      <polygon points={fillPoints} fill={fillColor} />

      {/* Linha */}
      <polyline points={points} fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />

      {/* Pontos nas intersecções */}
      {data.map((value, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - (value / maxValue) * height;
        return <circle key={index} cx={x} cy={y} r={4} fill={strokeColor} />;
      })}
    </svg>
  );
};

export default LineGraph;
