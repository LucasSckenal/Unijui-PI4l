// Api do axios
import axios from "axios";
import { useEffect, useState } from "react";

function Axios() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    // Fazer a requisição para a API que retorna os dados do RDS
    axios
      .get("/dados")
      .then((response) => {
        setDados(response.data); // Atualiza o estado com os dados recebidos
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });
  }, []);

  return (
    <div>
      <h1>Dados do RDS:</h1>
      <h2>{JSON.stringify(dados, null, 2)}</h2>
    </div>
  );
}

export default Axios;
