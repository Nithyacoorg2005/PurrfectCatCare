import React, { createContext, useState, useContext, useEffect } from 'react';
import { Cat } from '../types/cat';

interface CatContextType {
  cats: Cat[];
  activeCat: Cat | null;
  addCat: (cat: Omit<Cat, 'id'>) => void;
  updateCat: (id: string, cat: Partial<Cat>) => void;
  deleteCat: (id: string) => void;
  setActiveCat: (id: string) => void;
}

const CatContext = createContext<CatContextType | undefined>(undefined);

export const CatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [activeCat, setActiveCat] = useState<Cat | null>(null);

  // Load cats from localStorage on initial render
  useEffect(() => {
    const storedCats = localStorage.getItem('cats');
    if (storedCats) {
      const parsedCats = JSON.parse(storedCats);
      setCats(parsedCats);
      
      // Set the first cat as active if available
      if (parsedCats.length > 0) {
        setActiveCat(parsedCats[0]);
      }
    }
  }, []);

  // Save cats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cats', JSON.stringify(cats));
  }, [cats]);

  const addCat = (cat: Omit<Cat, 'id'>) => {
    const newCat = {
      ...cat,
      id: Date.now().toString(),
    };
    setCats([...cats, newCat]);
    
    // If this is the first cat, set it as active
    if (cats.length === 0) {
      setActiveCat(newCat);
    }
  };

  const updateCat = (id: string, updatedCat: Partial<Cat>) => {
    setCats(cats.map(cat => 
      cat.id === id ? { ...cat, ...updatedCat } : cat
    ));
    
    // Update active cat if it's the one being updated
    if (activeCat && activeCat.id === id) {
      setActiveCat({ ...activeCat, ...updatedCat });
    }
  };

  const deleteCat = (id: string) => {
    setCats(cats.filter(cat => cat.id !== id));
    
    // If the active cat is deleted, set another cat as active
    if (activeCat && activeCat.id === id) {
      const remainingCats = cats.filter(cat => cat.id !== id);
      setActiveCat(remainingCats.length > 0 ? remainingCats[0] : null);
    }
  };

  const handleSetActiveCat = (id: string) => {
    const cat = cats.find(cat => cat.id === id) || null;
    setActiveCat(cat);
  };

  return (
    <CatContext.Provider
      value={{
        cats,
        activeCat,
        addCat,
        updateCat,
        deleteCat,
        setActiveCat: handleSetActiveCat,
      }}
    >
      {children}
    </CatContext.Provider>
  );
};

export const useCats = () => {
  const context = useContext(CatContext);
  if (context === undefined) {
    throw new Error('useCats must be used within a CatProvider');
  }
  return context;
};