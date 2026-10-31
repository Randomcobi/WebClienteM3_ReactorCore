// Pie con el origen de los datos y el botón de recarga

const formatAge = (ms) => {
  const minutes = Math.round(ms / 60_000);
  if (minutes < 1) return 'hace un momento';
  if (minutes < 60) return `hace ${minutes} min`;
  return `hace ${Math.round(minutes / 60)} h`;
};

export default function Footer({ source, loading, onReload }) {
  return (
    <footer className="site-footer">
      {source && (
        <span>
          {source.fromCache
            ? `Datos de la caché local (${formatAge(Date.now() - source.savedAt)})`
            : 'Datos recién descargados de la API'}
        </span>
      )}
      <button type="button" className="btn btn--ghost" onClick={onReload} disabled={loading}>
        Actualizar datos
      </button>
      <span>
        Datos: <a href="https://gundam-api.pages.dev" target="_blank" rel="noopener noreferrer">Gundam API</a> · Gundam Wiki (Fandom)
      </span>
    </footer>
  );
}
