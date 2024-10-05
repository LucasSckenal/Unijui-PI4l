import { useState, useEffect } from "react";

const Times = () => {
  const [horaAtual, setHoraAtual] = useState("");
  const [dataAtual, setDataAtual] = useState("");

  useEffect(() => {
    const clock = setInterval(() => {
      const data = new Date();
      const Montys = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ];
      const hours = String(data.getHours()).padStart(2, "0");
      const min = String(data.getMinutes()).padStart(2, "0");
      const Monty = Montys[data.getMonth()];
      const day = data.getDate();
      const year = data.getFullYear();
      setDataAtual(`${day} de ${Monty} de ${year}`);
      setHoraAtual(`${hours}:${min}`);
    }, 1000);

    return () => {
      clearInterval(clock);
    };
  }, []);

  return (
    <div>
      <h1>{horaAtual}</h1>
      <h2>{dataAtual}</h2>
    </div>
  );
};

export default Times;