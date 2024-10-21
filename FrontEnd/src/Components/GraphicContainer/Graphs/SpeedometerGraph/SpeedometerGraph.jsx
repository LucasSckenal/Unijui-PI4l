import { useEffect, useRef, useState } from "react";

const SpeedometerGraph = ({ value = 0 }) => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 360, height: 280 });
  const [animatedValue, setAnimatedValue] = useState(0); // Valor interpolado

  // Função para animar o ponteiro
  useEffect(() => {
    let animationFrame;
    const start = performance.now();
    const initialValue = animatedValue;
    const duration = 1000; // Duração da animação em ms

    const animate = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const newValue = initialValue + progress * (value - initialValue);
      setAnimatedValue(newValue); // Atualiza o valor interpolado

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value]);

  // Atualiza as dimensões do canvas
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const { offsetWidth } = canvasRef.current.parentElement;
        const newWidth = offsetWidth;
        const newHeight = (newWidth / 360) * 280;
        setDimensions({ width: newWidth, height: newHeight });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Redesenha o gráfico sempre que o valor ou dimensões mudam
  useEffect(() => {
    const { width, height } = dimensions;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const centerX = width / 2;
    const centerY = height * 0.8;
    const radius = Math.min(centerX, centerY) - 30;

    // Limpa o canvas
    ctx.clearRect(0, 0, width, height);

    // Desenha a borda do arco curvado
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 0, false);
    ctx.lineWidth = 10;
    ctx.strokeStyle = "black";
    ctx.stroke();

    // Gradiente circular
    const gradient = ctx.createConicGradient(0.75 * Math.PI, centerX, centerY);
    gradient.addColorStop(0, "green");
    gradient.addColorStop(0.5, "yellow");
    gradient.addColorStop(0.75, "red");

    // Desenha o arco com gradiente
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 0, false);
    ctx.lineWidth = 50;
    ctx.strokeStyle = gradient;
    ctx.stroke();

    // Calcula o ângulo para o ponteiro com base no valor animado
    const angle = Math.PI + (animatedValue / 150) * Math.PI;
    const pointerLength = radius;
    const pointerX = centerX + pointerLength * Math.cos(angle);
    const pointerY = centerY + pointerLength * Math.sin(angle);
    const pointerBaseWidth = 18;

    // Desenha o ponteiro
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX - (pointerBaseWidth / 2) * Math.sin(angle),
      centerY + (pointerBaseWidth / 2) * Math.cos(angle)
    );
    ctx.lineTo(pointerX, pointerY);
    ctx.lineTo(
      centerX + (pointerBaseWidth / 2) * Math.sin(angle),
      centerY - (pointerBaseWidth / 2) * Math.cos(angle)
    );
    ctx.closePath();
    ctx.fillStyle = "red";
    ctx.fill();

    // Valor abaixo do ponteiro
    ctx.beginPath();
    ctx.arc(centerX, centerY, 25, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#2D2D2D";
    ctx.stroke();

    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${Math.round(animatedValue)}`, centerX, centerY);

    // Função para desenhar retângulos arredondados
    const drawRoundedRect = (
      x,
      y,
      rectWidth,
      rectHeight,
      radius,
      fillColor,
      text
    ) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + rectWidth - radius, y);
      ctx.quadraticCurveTo(x + rectWidth, y, x + rectWidth, y + radius);
      ctx.lineTo(x + rectWidth, y + rectHeight - radius);
      ctx.quadraticCurveTo(
        x + rectWidth,
        y + rectHeight,
        x + rectWidth - radius,
        y + rectHeight
      );
      ctx.lineTo(x + radius, y + rectHeight);
      ctx.quadraticCurveTo(x, y + rectHeight, x, y + rectHeight - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();

      ctx.fillStyle = fillColor;
      ctx.fill();

      ctx.font = "16px 'Roboto', sans-serif";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, x + rectWidth / 2, y + rectHeight / 2);
    };

    const badCenterX = centerX + radius - 40;
    const goodCenterX = centerX - radius - 40;
    const centerCoordinate = centerY + 5;

    drawRoundedRect(
      badCenterX,
      centerCoordinate,
      80,
      30,
      10,
      "#F44336",
      "PERIGO"
    );
    drawRoundedRect(
      goodCenterX,
      centerCoordinate,
      80,
      30,
      10,
      "#4CAF50",
      "BOM"
    );
  }, [animatedValue, dimensions]);

  return (
    <div style={{ width: "100%", height: "auto" }}>
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
      />
    </div>
  );
};

export default SpeedometerGraph;
