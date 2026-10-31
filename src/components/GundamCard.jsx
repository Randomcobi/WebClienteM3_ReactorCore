import GundamImage from './GundamImage.jsx';
import FavoriteButton from './FavoriteButton.jsx';

export default function GundamCard({ gundam, isFavorite, onToggleFavorite }) {
  return (
    <div className="card-wrap">
      <a className="card" href={`#/gundam/${gundam.id}`}>
        <GundamImage gundam={gundam} className="card__img" />
        <span className="card__code">{gundam.code || `#${gundam.id}`}</span>
        <span className="card__name">{gundam.shortName}</span>
        <span className="card__universe">{gundam.universe}</span>
      </a>
      {/* El botón va fuera del enlace para no abrir la ficha al pulsarlo */}
      <FavoriteButton active={isFavorite} onToggle={onToggleFavorite} />
    </div>
  );
}
