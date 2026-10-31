// Estrella para marcar o desmarcar un traje como favorito

export default function FavoriteButton({ active, onToggle, className = '' }) {
  return (
    <button
      type="button"
      className={`fav ${active ? 'fav--active' : ''} ${className}`}
      onClick={onToggle}
      aria-pressed={active}
      title={active ? 'Quitar de favoritos' : 'Añadir a favoritos'}
    >
      {active ? '★' : '☆'}
    </button>
  );
}
