// Componente principal de la app

import { useGundams } from './hooks/useGundams.js';

export default function App() {
  const { gundams, status, error, reload } = useGundams();

  return (
    <>
      <header className="site-header">
        <a className="logo" href="#/">GUNDAM<span>WIKI</span></a>
        <p className="tagline">Archivo de mobile suits de todas las líneas temporales</p>
      </header>

      <main className="layout">
        {status === 'loading' && <p className="muted">Cargando trajes…</p>}
        {status === 'error' && <p className="state--error">{error}</p>}
        {status === 'ready' && (
          <ul>
            {gundams.slice(0, 20).map((gundam) => (
              <li key={gundam.id}>{gundam.fullName}</li>
            ))}
          </ul>
        )}
      </main>

      <footer className="site-footer">
        <button type="button" className="btn btn--ghost" onClick={reload} disabled={status === 'loading'}>
          Actualizar datos
        </button>
        <span>
          Datos: <a href="https://gundam-api.pages.dev" target="_blank" rel="noopener noreferrer">Gundam API</a> · Gundam Wiki (Fandom)
        </span>
      </footer>
    </>
  );
}
