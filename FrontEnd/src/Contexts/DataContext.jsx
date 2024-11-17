import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [combinedData, setCombinedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizando as requisições em paralelo
        const [data1, data2] = await Promise.all([
          fetch(
            "http://localhost:3000/sensors/current-data/Estação%20Cruzeiro_n"
          ).then((response) => {
            if (!response.ok)
              throw new Error(`Erro na requisição 1: ${response.statusText}`);
            return response.json();
          }),
          fetch(
            "http://localhost:3000/sensors/current-data/Micropartículas%20Rótula%20do%20Taffarel_k"
          ).then((response) => {
            if (!response.ok)
              throw new Error(`Erro na requisição 2: ${response.statusText}`);
            return response.json();
          }),
        ]);

        // Consolidando os dados em um único JSON
        const consolidated = {
          nit: data1,
          k7: data2,
        };

        console.log("Dados consolidados:", consolidated);
        setCombinedData(consolidated); // Atualiza o estado com o JSON consolidado
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={combinedData}>{children}</DataContext.Provider>
  );
};
