// Estadísticas de los trajes que se están mostrando

export default function Stats({ stats }) {
  const { total, universes, pilots, withImage, topPilot, topPilotCount } = stats;

  return (
    <dl className="stats">
      <div><dt>Trajes</dt><dd>{total}</dd></div>
      <div><dt>Universos</dt><dd>{universes}</dd></div>
      <div><dt>Pilotos distintos</dt><dd>{pilots}</dd></div>
      <div><dt>Con imagen</dt><dd>{withImage}</dd></div>
      <div><dt>Piloto más repetido</dt><dd>{topPilot ? `${topPilot} (${topPilotCount})` : '—'}</dd></div>
    </dl>
  );
}
