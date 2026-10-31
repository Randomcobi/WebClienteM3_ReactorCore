// Custom hook: descarga los trajes y guarda el estado de la carga

import { useEffect, useState } from 'react';
import { getAllGundams } from '../api/gundamApi.js';
import { normalizeGundams } from '../logic/gundams.js';

export function useGundams() {
  const [gundams, setGundams] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | error | ready
  const [error, setError] = useState(null);
  const [source, setSource] = useState(null);
  // Cada vez que cambia, el efecto vuelve a pedir los datos
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    // Si el componente se desmonta o se recarga antes de acabar, ignoramos la respuesta
    let ignore = false;

    async function load() {
      setStatus('loading');
      try {
        // La primera vez usamos la caché, al recargar la saltamos
        const { results, fromCache, savedAt } = await getAllGundams({ force: reloadCount > 0 });
        const list = normalizeGundams(results);
        if (list.length === 0) throw new Error('La API no ha devuelto ningún mobile suit utilizable.');
        if (ignore) return;

        setGundams(list);
        setSource({ fromCache, savedAt });
        setStatus('ready');
      } catch (err) {
        if (ignore) return;
        console.error(err);
        setError(err.message || 'Error desconocido al cargar los datos.');
        setStatus('error');
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [reloadCount]);

  const reload = () => setReloadCount((count) => count + 1);

  return { gundams, status, error, source, reload };
}
