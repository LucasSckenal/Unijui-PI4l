import { useState, useEffect, useRef } from "react";

const SpeedometerGraph = () => {
  const [value, setValue] = useState(0); // Valor inicial
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Criar gradiente circular
    const gradient = ctx.createConicGradient(0.75 * Math.PI, centerX, centerY);
    gradient.addColorStop(0, "green");
    gradient.addColorStop(0.5, "yellow");
    gradient.addColorStop(1, "red");

    // Desenha o arco com gradiente
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 0, false);
    ctx.lineWidth = 50; // Aumentar a espessura do arco
    ctx.strokeStyle = gradient;
    ctx.stroke();

    // Desenha o ponteiro
    const angle = Math.PI + (value / 150) * Math.PI;
    const pointerLength = radius - 20;
    const pointerX = centerX + pointerLength * Math.cos(angle);
    const pointerY = centerY + pointerLength * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(pointerX, pointerY);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "red";
    ctx.stroke();

    // Desenha o valor logo abaixo do ponteiro
    const valueX = centerX + (pointerLength + 20) * Math.cos(angle);
    const valueY = centerY + (pointerLength + 20) * Math.sin(angle);
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(`${value}`, valueX, valueY);

    // Desenha as labels "POOR" e "GOOD"
    ctx.fillStyle = "red";
    ctx.fillText("PERIGO", centerX + radius, centerY + 30);
    ctx.fillStyle = "green";
    ctx.fillText("BOM", centerX - radius, centerY + 30);
  }, [value]);

  return (
    <div>
      <canvas ref={canvasRef} width={280} height={200} />
      <input
        type="range"
        min="0"
        max="150"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ width: "280px" }}
      />
    </div>
  );
};

export default SpeedometerGraph;
