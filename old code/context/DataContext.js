import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchAllData } from '../services/DataService';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({ notes: [], posts: [], projects: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const fetchedData = await fetchAllData();
        setData(fetchedData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <DataContext.Provider value={{ ...data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);