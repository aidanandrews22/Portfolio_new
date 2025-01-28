import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);
  const showError = (message) => setError(message);
  const clearError = () => setError(null);

  return (
    <AppContext.Provider value={{ 
      loading, 
      error, 
      showLoading, 
      hideLoading, 
      showError, 
      clearError 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};