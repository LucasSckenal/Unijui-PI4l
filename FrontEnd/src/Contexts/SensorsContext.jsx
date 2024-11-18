import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Cria o contexto
export const SensorsContext = createContext();

// Provedor do contexto
export const SensorsProvider = ({ children }) => {
  const [sensorsData, setSensorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Função para buscar os dados dos sensores
    const fetchSensorsData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/sensors/tabela-combinada/last-24-hours');
        const processedData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

        // Substitui valores undefined ou null por 0
        const updatedData = processedData.map(item => {
          return Object.keys(item).reduce((acc, key) => {
            acc[key] = item[key] ?? 0;  // Se o valor for undefined ou null, coloca 0
            return acc;
          }, {});
        });

        setSensorsData(updatedData);
      } catch (err) {
        console.error('Erro ao buscar dados dos sensores:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSensorsData();
  }, []);

  return (
    <SensorsContext.Provider value={{ sensorsData, loading, error }}>
      {children}
    </SensorsContext.Provider>
  );
};
