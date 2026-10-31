// Custom hook: devuelve el hash de la URL (#/gundam/12) y se actualiza al cambiar

import { useEffect, useState } from 'react';

export function useHash() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const handleChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handleChange);
    // Cleanup: quitamos el listener al desmontar
    return () => window.removeEventListener('hashchange', handleChange);
  }, []);

  return hash;
}
