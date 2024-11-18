export const generateHourlyLabels = (interval) => {
  const labels = [];
  const totalHours = interval.duration;
  const durationInMinutes = totalHours * 60;

  let step = 60;

  switch (interval.value) {
    case "30m":
      step = 5;
      break;
    case "1h":
      step = 10;
      break;
    case "3h":
      step = 20;
      break;
    case "6h":
      step = 30;
      break;
    case "24h":
      step = 60;
      break;
    default:
      step = 60;
      break;
  }

  const generateLabels = () => {
    const now = new Date();
    labels.length = 0;

    for (let i = 0; i < durationInMinutes; i += step) {
      const hour = new Date(now.getTime() - i * 60 * 1000);
      const minutes = hour.getMinutes();
      const hourLabel = `${hour.getHours()}:${
        minutes < 10 ? "0" + minutes : minutes
      }`;
      labels.unshift(hourLabel);
    }
  };

  generateLabels();
  setInterval(generateLabels, 10000);

  return labels;
};
