// Componente principal: guarda el estado y se lo pasa a los demás

import { useDeferredValue, useState } from 'react';
import { useGundams } from './hooks/useGundams.js';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import { useHash } from './hooks/useHash.js';
import { applyFilters, findGundam, getStats, getUniverseOptions } from './logic/gundams.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Filters from './components/Filters.jsx';
import Stats from './components/Stats.jsx';
import GundamList from './components/GundamList.jsx';
import GundamDetail from './components/GundamDetail.jsx';
import { EmptyMessage, ErrorMessage, Loading } from './components/States.jsx';

const PAGE_SIZE = 24;
const INITIAL_FILTERS = { query: '', universe: 'all', onlyWithImage: false, onlyFavorites: false, sort: 'id' };

export default function App() {
  const { gundams, status, error, source, reload } = useGundams();
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [favorites, setFavorites] = useLocalStorage('gundam-wiki:favorites', []);
  const hash = useHash();

  // La búsqueda se aplica sin bloquear lo que escribe el usuario
  const deferredQuery = useDeferredValue(filters.query);

  // Valores derivados: se calculan en cada render, no se guardan en el estado
  const filtered = applyFilters(gundams, { ...filters, query: deferredQuery })
    .filter((g) => !filters.onlyFavorites || favorites.includes(g.id));
  const universes = getUniverseOptions(gundams);
  const stats = getStats(filtered);
  const detailId = hash.match(/^#\/gundam\/(\d+)$/)?.[1];
  const selected = detailId ? findGundam(gundams, detailId) : null;

  const handleFilterChange = (changes) => {
    setFilters((current) => ({ ...current, ...changes }));
    setVisible(PAGE_SIZE); // al cambiar un filtro volvemos a la primera página
  };

  const toggleFavorite = (id) => {
    setFavorites((current) => (current.includes(id) ? current.filter((f) => f !== id) : [...current, id]));
  };

  // Abre la ficha de un traje al azar entre los que pasan los filtros
  const showRandom = () => {
    if (filtered.length === 0) return;
    const random = filtered[Math.floor(Math.random() * filtered.length)];
    window.location.hash = `#/gundam/${random.id}`;
  };

  return (
    <>
      <Header />

      <main className="layout">
        {status === 'loading' && <Loading />}
        {status === 'error' && <ErrorMessage message={error} onRetry={reload} />}

        {status === 'ready' && detailId && (
          selected ? (
            <GundamDetail
              gundam={selected}
              isFavorite={favorites.includes(selected.id)}
              onToggleFavorite={() => toggleFavorite(selected.id)}
            />
          ) : (
            <EmptyMessage>No existe ningún traje con el registro #{detailId}.</EmptyMessage>
          )
        )}

        {status === 'ready' && !detailId && (
          <>
            <Filters
              filters={filters}
              universes={universes}
              favoritesCount={favorites.length}
              onChange={handleFilterChange}
              onRandom={showRandom}
            />
            <Stats stats={stats} />
            <GundamList
              gundams={filtered}
              visible={visible}
              onShowMore={() => setVisible((v) => v + PAGE_SIZE)}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          </>
        )}
      </main>

      <Footer source={source} loading={status === 'loading'} onReload={reload} />
    </>
  );
}
