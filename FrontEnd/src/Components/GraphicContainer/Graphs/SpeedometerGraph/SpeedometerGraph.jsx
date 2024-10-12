import { useEffect, useRef } from "react";

const SpeedometerGraph = ({ value = 0 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2; // Centraliza horizontalmente
    const centerY = canvas.height * 0.8; // Mover o centro um pouco para cima
    const radius = Math.min(centerX, centerY) - 30; // Ajustar o raio para não ficar muito próximo das bordas

    // Limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha a borda do arco curvado
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 0, false);
    ctx.lineWidth = 10; // Largura maior para borda
    ctx.strokeStyle = "black"; // Cor da borda
    ctx.stroke();

    // Criar gradiente circular
    const gradient = ctx.createConicGradient(0.75 * Math.PI, centerX, centerY);
    gradient.addColorStop(0, "green");
    gradient.addColorStop(0.5, "yellow");
    gradient.addColorStop(0.75, "red");

    // Desenha o arco com gradiente
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 0, false);
    ctx.lineWidth = 50; // Aumentar a espessura do arco
    ctx.strokeStyle = gradient;
    ctx.stroke();

    // Desenha o ponteiro
    const angle = Math.PI + (value / 150) * Math.PI;
    const pointerLength = radius; // Mantém o comprimento do ponteiro
    const pointerX = centerX + pointerLength * Math.cos(angle);
    const pointerY = centerY + pointerLength * Math.sin(angle);

    // Define a espessura na base do ponteiro
    const pointerBaseWidth = 18;

    // Desenha o ponteiro com afinamento
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);

    // Calcula as coordenadas das laterais da base do ponteiro, ajustando o ângulo
    ctx.lineTo(
      centerX - (pointerBaseWidth / 2) * Math.sin(angle),
      centerY + (pointerBaseWidth / 2) * Math.cos(angle)
    );

    // Desenha a ponta do ponteiro (o ponto final do triângulo)
    ctx.lineTo(pointerX, pointerY);

    // Desenha o outro lado da base do ponteiro
    ctx.lineTo(
      centerX + (pointerBaseWidth / 2) * Math.sin(angle),
      centerY - (pointerBaseWidth / 2) * Math.cos(angle)
    );

    ctx.closePath();

    ctx.fillStyle = "red"; // Cor do ponteiro
    ctx.fill();

    // Desenha o valor logo abaixo do ponteiro
    const valueX = centerX;
    const valueY = centerY; // Passando offset para ficar em baixo no meio do ponteiro

    // Desenha a borda arredondada ao redor do valor
    ctx.beginPath();
    ctx.arc(valueX, valueY - 2, 25, 0, 2 * Math.PI); // (coordenada x, coordenada y, tamanho, resto é para manter como circulo)
    ctx.fillStyle = "white"; // Cor do fundo
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black";
    ctx.stroke();

    // Informações usadas para a impressão do valor:
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(`${value}`, valueX, valueY);

    // Desenha o texto "Velocidade do Vento" abaixo do valor
    ctx.font = "16px Arial"; // Fonte do texto
    ctx.fillStyle = "black"; // Cor do texto
    ctx.textAlign = "center";
    ctx.fillText("Velocidade do Vento", valueX, valueY + 40); // Aumente o valor aqui para dar mais espaço

    // Função para desenhar retângulos arredondados
    const drawRoundedRect = (x, y, width, height, radius, fillColor, text) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width - radius,
        y + height
      );
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

    // Coordenadas
    const badCenterX = centerX + radius - 40;
    const goodCenterX = centerX - radius - 40;
    const centerCoordenate = centerY + 5;

    // Desenha os labels "PERIGO" e "BOM"
    drawRoundedRect(
      badCenterX,
      centerCoordenate,
      80,
      30,
      10,
      "#F44336",
      "PERIGO"
    );
    drawRoundedRect(
      goodCenterX,
      centerCoordenate,
      80,
      30,
      10,
      "#4CAF50",
      "BOM"
    );
  }, [value]);

  return (
    <div>
      <canvas ref={canvasRef} width={360} height={280} />
    </div>
  );
};

export default SpeedometerGraph;
