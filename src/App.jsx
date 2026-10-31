// Componente principal: guarda el estado y se lo pasa a los demás

import { useDeferredValue, useState } from 'react';
import { useGundams } from './hooks/useGundams.js';
import { applyFilters, getStats, getUniverseOptions } from './logic/gundams.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Filters from './components/Filters.jsx';
import Stats from './components/Stats.jsx';
import GundamList from './components/GundamList.jsx';
import { ErrorMessage, Loading } from './components/States.jsx';

const PAGE_SIZE = 24;
const INITIAL_FILTERS = { query: '', universe: 'all', onlyWithImage: false, sort: 'id' };

export default function App() {
  const { gundams, status, error, source, reload } = useGundams();
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [visible, setVisible] = useState(PAGE_SIZE);

  // La búsqueda se aplica sin bloquear lo que escribe el usuario
  const deferredQuery = useDeferredValue(filters.query);

  // Valores derivados: se calculan en cada render, no se guardan en el estado
  const filtered = applyFilters(gundams, { ...filters, query: deferredQuery });
  const universes = getUniverseOptions(gundams);
  const stats = getStats(filtered);

  const handleFilterChange = (changes) => {
    setFilters((current) => ({ ...current, ...changes }));
    setVisible(PAGE_SIZE); // al cambiar un filtro volvemos a la primera página
  };

  return (
    <>
      <Header />

      <main className="layout">
        {status === 'loading' && <Loading />}
        {status === 'error' && <ErrorMessage message={error} onRetry={reload} />}
        {status === 'ready' && (
          <>
            <Filters filters={filters} universes={universes} onChange={handleFilterChange} />
            <Stats stats={stats} />
            <GundamList
              gundams={filtered}
              visible={visible}
              onShowMore={() => setVisible((v) => v + PAGE_SIZE)}
            />
          </>
        )}
      </main>

      <Footer source={source} loading={status === 'loading'} onReload={reload} />
    </>
  );
}
