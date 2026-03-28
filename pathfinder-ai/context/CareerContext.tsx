'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type CareerContextType = {
  hasCompletedMatrix: boolean;
  setHasCompletedMatrix: (val: boolean) => void;
  topCareers: any[];
  setTopCareers: (careers: any[]) => void;
};

const CareerContext = createContext<CareerContextType | undefined>(undefined);

export function CareerProvider({ children }: { children: React.ReactNode }) {
  const [hasCompletedMatrix, setHasCompletedMatrix] = useState(false);
  const [topCareers, setTopCareers] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from local storage on mount
    const savedStatus = sessionStorage.getItem('pathfinder_completed');
    const savedCareers = sessionStorage.getItem('pathfinder_careers');
    if (savedStatus === 'true') {
      setHasCompletedMatrix(true);
      if (savedCareers) {
        setTopCareers(JSON.parse(savedCareers));
      }
    }
    setIsLoaded(true);
  }, []);

  const handleSetCompleted = (val: boolean) => {
    setHasCompletedMatrix(val);
    sessionStorage.setItem('pathfinder_completed', val.toString());
  };

  const handleSetCareers = (careers: any[]) => {
    setTopCareers(careers);
    sessionStorage.setItem('pathfinder_careers', JSON.stringify(careers));
  };

  // Prevent render of children until localStorage is checked to avoid hydration hydration mismatch on protected routes
  if (!isLoaded) return null;

  return (
    <CareerContext.Provider value={{
      hasCompletedMatrix,
      setHasCompletedMatrix: handleSetCompleted,
      topCareers,
      setTopCareers: handleSetCareers
    }}>
      {children}
    </CareerContext.Provider>
  );
}

export function useCareerContext() {
  const context = useContext(CareerContext);
  if (context === undefined) {
    throw new Error('useCareerContext must be used within a CareerProvider');
  }
  return context;
}
