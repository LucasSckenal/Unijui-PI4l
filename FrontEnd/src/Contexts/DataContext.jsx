import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [combinedData, setCombinedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizando as requisições em paralelo
        const [tabelaCombinada] = await Promise.all([
          fetch(
            "http://localhost:3000/sensors/all-data/Micropartículas%20Rótula%20do%20Taffarel_k/2024-10-30"
          ).then((response) => {
            if (!response.ok)
              throw new Error(`Erro na requisição: ${response.statusText}`);
            return response.json();
          }),
        ]);

        // Consolidando os dados em um único JSON
        const consolidated = {
          tabela: tabelaCombinada,
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
