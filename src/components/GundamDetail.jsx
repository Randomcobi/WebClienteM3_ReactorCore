// Ficha completa de un traje

import { useEffect } from 'react';
import GundamImage from './GundamImage.jsx';
import FavoriteButton from './FavoriteButton.jsx';

export default function GundamDetail({ gundam, isFavorite, onToggleFavorite }) {
  // Al abrir otra ficha: subimos arriba y cambiamos el título de la pestaña
  useEffect(() => {
    window.scrollTo({ top: 0 });
    const previousTitle = document.title;
    document.title = `${gundam.fullName} · Gundam Wiki`;
    // Cleanup: al salir de la ficha se recupera el título anterior
    return () => {
      document.title = previousTitle;
    };
  }, [gundam.id, gundam.fullName]);

  return (
    <article className="detail">
      <a className="back" href="#/">← Volver al hangar</a>
      <header className="detail__header">
        {gundam.code && <p className="detail__code">{gundam.code}</p>}
        <h2>
          {gundam.shortName}{' '}
          <FavoriteButton active={isFavorite} onToggle={onToggleFavorite} className="fav--inline" />
        </h2>
        <p className="detail__universe">{gundam.universe}</p>
      </header>

      <div className="detail__body">
        <GundamImage gundam={gundam} className="detail__img" />
        <div>
          {gundam.quote && (
            <blockquote className="quote">
              “{gundam.quote.text}”
              {gundam.quote.author && <footer>— {gundam.quote.author}</footer>}
            </blockquote>
          )}
          <p>{gundam.description}</p>

          <h3>Pilotos</h3>
          {gundam.pilots.length > 0 ? (
            <ul className="pilots">
              {gundam.pilots.map((pilot) => (
                <li key={pilot}>{pilot}</li>
              ))}
            </ul>
          ) : (
            <p className="muted">Sin pilotos registrados.</p>
          )}

          <dl className="meta">
            <div><dt>ID</dt><dd>{gundam.id}</dd></div>
            <div><dt>Nombre completo</dt><dd>{gundam.fullName}</dd></div>
          </dl>

          {gundam.wikiUrl && (
            <a className="btn" href={gundam.wikiUrl} target="_blank" rel="noopener noreferrer">
              Ver en la Gundam Wiki ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
