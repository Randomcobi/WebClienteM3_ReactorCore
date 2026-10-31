// Custom hook: como useState pero guardando el valor en localStorage

import { useEffect, useState } from 'react';

export function useLocalStorage(key, initialValue) {
  // Solo se lee localStorage la primera vez (inicialización perezosa)
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Cada vez que cambia el valor, lo guardamos
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Si no se puede guardar, seguimos sin persistencia
    }
  }, [key, value]);

  return [value, setValue];
}
