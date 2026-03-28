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

  return (
    <CareerContext.Provider value={{
      hasCompletedMatrix,
      setHasCompletedMatrix,
      topCareers,
      setTopCareers
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
