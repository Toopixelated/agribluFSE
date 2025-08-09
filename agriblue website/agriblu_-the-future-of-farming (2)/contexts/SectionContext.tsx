import React, { useState, createContext, useContext, ReactNode, FC } from 'react';

interface SectionContextType {
  visibleSection: string;
  setVisibleSection: (sectionId: string) => void;
}

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export const SectionProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [visibleSection, setVisibleSection] = useState<string>('home'); // Default to 'home'

  const value = { visibleSection, setVisibleSection };

  return (
    <SectionContext.Provider value={value}>
      {children}
    </SectionContext.Provider>
  );
};

export const useSection = (): SectionContextType => {
  const context = useContext(SectionContext);
  if (context === undefined) {
    throw new Error('useSection must be used within a SectionProvider');
  }
  return context;
};