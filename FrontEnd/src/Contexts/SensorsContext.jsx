/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Cria o contexto
export const SensorsContext = createContext();

// Provedor do contexto
export const SensorsProvider = ({ children }) => {
  const [sensorsData, setSensorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDataDate, setDataSelectedDate] = useState(""); // Pego no main ao selecionar data no calendário

  useEffect(() => {
    const fetchSensorsData = async () => {
      try {
        // Adiciona hora atual à data selecionada
        const now = new Date();
        const formattedTime = now.toISOString().split("T")[1]; // Extrai apenas a parte da hora
  
        // Verifica se a selectedDataDate está definida
        let dateQuery = "";
        if (selectedDataDate) {
          // Adiciona a hora ao final da data selecionada
          dateQuery = `?selectedDate=${selectedDataDate}T${formattedTime}`;
        }
  
        const response = await axios.get(`http://localhost:3000/sensors/tabela-combinada/last-24-hours${dateQuery}`);
        const processedData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
  
        // Substitui valores nulos por 0
        const updatedData = processedData.map(item => {
          return Object.keys(item).reduce((acc, key) => {
            acc[key] = item[key] ?? 0;
            return acc;
          }, {});
        });
  
        setSensorsData(updatedData);
      } catch (err) {
        console.error("Erro ao buscar dados dos sensores:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchSensorsData();
  }, [selectedDataDate]); // Reexecuta quando selectedDataDate muda
  

  return (
    <SensorsContext.Provider
      value={{ sensorsData, loading, error, selectedDataDate, setDataSelectedDate }}
    >
      {children}
    </SensorsContext.Provider>
  );
};
