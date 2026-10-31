// Rejilla de trajes con el botón "Cargar más"

import GundamCard from './GundamCard.jsx';
import { EmptyMessage } from './States.jsx';

export default function GundamList({ gundams, visible, onShowMore }) {
  if (gundams.length === 0) return <EmptyMessage />;

  const shown = gundams.slice(0, visible);

  return (
    <>
      <p className="results-count">Mostrando {shown.length} de {gundams.length} trajes</p>
      <ul className="grid">
        {shown.map((gundam) => (
          <li key={gundam.id}>
            <GundamCard gundam={gundam} />
          </li>
        ))}
      </ul>
      {shown.length < gundams.length && (
        <button type="button" className="btn btn--more" onClick={onShowMore}>Cargar más</button>
      )}
    </>
  );
}
