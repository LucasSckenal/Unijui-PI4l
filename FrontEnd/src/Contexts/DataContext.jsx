import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/Json/dadosTeste.json")
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Erro ao carregar dados: ", error));
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
