import styles from "./styles.module.scss";

const PieChart = ({ data, size = 200, strokeWidth = 40 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let cumulativePercent = 0;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={styles.pieChart}
    >
      {data.map((item, index) => {
        const { value, color } = item;
        const percent = value / 100;
        const offset = circumference * cumulativePercent;
        const strokeDasharray = `${circumference * percent} ${circumference}`;
        cumulativePercent += percent;

        return (
          <circle
            key={index}
            r={radius}
            cx={size / 2}
            cy={size / 2}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={-offset}
          />
        );
      })}
    </svg>
  );
};

export default PieChart;
