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

      // Desenha a borda do arco curvado
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, Math.PI, 0, false);
      ctx.lineWidth = 60; // Largura maior para borda
      ctx.strokeStyle = "black"; // Cor da borda
      ctx.stroke();

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
      const pointerLength = radius;
      const pointerX = centerX + pointerLength * Math.cos(angle);
      const pointerY = centerY + pointerLength * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(pointerX, pointerY);
      ctx.lineWidth = 5;
      ctx.strokeStyle = "red"; //? Cor do ponteiro
      ctx.stroke();

      // Desenha o valor logo abaixo do ponteiro
      const valueX = centerX;
      const valueY = centerY; // Passando offset para ficar em baixo no meio do ponteiro

      // Desenha a borda arredondada ao redor do valor
      ctx.beginPath();
      ctx.arc(valueX, valueY - 2, 20, 0, 2 * Math.PI); // (coordenada x, coordenada y, tamanho, resto é para manter como circulo)
      ctx.fillStyle = "white"; //Cor do fundo
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "black";
      ctx.stroke();

      //Informações usadas para a impressão do valor:
      ctx.font = "20px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText(`${value}`, valueX, valueY);

      
    // Função para desenhar retângulos arredondados
    const drawRoundedRect = (x, y, width, height, radius, fillColor, text) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();

      ctx.fillStyle = fillColor;
      ctx.fill();

      ctx.font = "16px 'Roboto', sans-serif";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, x + width / 2, y + height / 2);
    };

    //Coordenadas
    const badCenterX = centerX + radius - 40;
    const goodCenterX = centerX - radius - 40;
    const centerCoordenate = centerY + 5;

    // Desenha os labels "PERIGO" e "BOM"
    drawRoundedRect(badCenterX, centerCoordenate, 80, 30, 10, "#F44336", "PERIGO");
    drawRoundedRect(goodCenterX, centerCoordenate, 80, 30, 10, "#4CAF50", "BOM");
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
