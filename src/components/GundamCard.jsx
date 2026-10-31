import GundamImage from './GundamImage.jsx';

export default function GundamCard({ gundam }) {
  return (
    <a className="card" href={`#/gundam/${gundam.id}`}>
      <GundamImage gundam={gundam} className="card__img" />
      <span className="card__code">{gundam.code || `#${gundam.id}`}</span>
      <span className="card__name">{gundam.shortName}</span>
      <span className="card__universe">{gundam.universe}</span>
    </a>
  );
}
