// Mensajes de carga, error y lista vacía

export function Loading() {
  return (
    <div className="state state--loading" role="status">
      <span className="spinner" aria-hidden="true"></span>
      <p>Conectando con la base de datos de la Federación…</p>
    </div>
  );
}

export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="state state--error" role="alert">
      <p className="state__title">⚠ Error de transmisión</p>
      <p>{message}</p>
      <button type="button" className="btn" onClick={onRetry}>Reintentar</button>
    </div>
  );
}

export function EmptyMessage({ children = 'Ningún mobile suit coincide con la búsqueda.' }) {
  return (
    <div className="state state--empty">
      <p>{children}</p>
    </div>
  );
}
