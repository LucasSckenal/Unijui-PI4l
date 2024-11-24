/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import "./BarometerGraph.scss";

const BarometerGraph = ({ pressure = 1013, minPressure = 950, maxPressure = 1050 }) => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 360, height: 260 });
  const [animatedPressure, setAnimatedPressure] = useState(
    Math.max(minPressure, Math.min(maxPressure, pressure))
  );

  // Função para determinar a cor com base na pressão
  const getFillColor = (pressure) => {
    const range = maxPressure - minPressure;
    const normalizedPressure = Math.max(0, Math.min(1, (pressure - minPressure) / range));

    if (normalizedPressure <= 0.33) return `rgb(0, 255, 0)`; // Verde
    if (normalizedPressure <= 0.66) return `rgb(255, 255, 0)`; // Amarelo
    return `rgb(255, 0, 0)`; // Vermelho
  };

  // Animar a atualização do ponteiro
  useEffect(() => {
    let animationFrame;
    const start = performance.now();
    const initialValue = Math.max(
      minPressure,
      Math.min(maxPressure, animatedPressure) // Limitar valor inicial
    );
    const targetValue = Math.max(minPressure, Math.min(maxPressure, pressure));
    const duration = 1000; // Duração da animação

    const animate = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const newValue = initialValue + progress * (targetValue - initialValue);
      setAnimatedPressure(newValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [pressure, minPressure, maxPressure]);

  // Atualizar dimensões do canvas
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

  // Desenhar o gráfico
  useEffect(() => {
    const { width, height } = dimensions;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const centerX = width / 2;
    const centerY = height * 0.8;
    const radius = Math.min(centerX, centerY) - 30;

    // Limpar o canvas
    ctx.clearRect(0, 0, width, height);

    // Gradiente externo
    const gradientOuter = ctx.createConicGradient(0.75 * Math.PI, centerX, centerY);
    gradientOuter.addColorStop(0, "green");
    gradientOuter.addColorStop(0.4, "yellow");
    gradientOuter.addColorStop(0.5, "red");

    // Desenhar arco externo (guia)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 20, Math.PI, 0, false);
    ctx.lineWidth = 10;
    ctx.strokeStyle = gradientOuter;
    ctx.stroke();

    // Determinar a cor do preenchimento
    const fillColor = getFillColor(animatedPressure);

    // Calcular o ângulo preenchido
    const angleFilled =
      Math.PI + ((animatedPressure - minPressure) / (maxPressure - minPressure)) * Math.PI;

    // Barra interior preenchendo
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 10, Math.PI, angleFilled, false);
    ctx.lineWidth = 30;
    ctx.strokeStyle = fillColor;
    ctx.stroke();
  }, [animatedPressure, dimensions, minPressure, maxPressure]);

  return (
    <div className="barometer-container">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        aria-label={`Pressão atmosférica: ${Math.round(animatedPressure)} hPa`}
      />
      <div
        className="barometer-value"
        style={{
          top: `${dimensions.height * 0.7}px`,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {Math.round(pressure)} hPa
      </div>
      <div
        className="barometer-min"
        style={{
          top: `${dimensions.height * 0.82}px`,
          left: `${dimensions.width * 0.02}px`,
        }}
      >
        {minPressure}
      </div>
      <div
        className="barometer-max"
        style={{
          top: `${dimensions.height * 0.82}px`,
          right: `${dimensions.width * 0.02}px`,
        }}
      >
        {maxPressure}
      </div>
    </div>
  );
};

export default BarometerGraph;
