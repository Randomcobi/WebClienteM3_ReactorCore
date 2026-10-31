// Buscador y filtros (inputs controlados: el valor viene de App)

export default function Filters({ filters, universes, onChange }) {
  return (
    <section className="controls" aria-label="Búsqueda y filtros">
      <label className="field">
        <span>Buscar</span>
        <input
          type="search"
          placeholder="Nombre, modelo o piloto (p. ej. Amuro)"
          value={filters.query}
          onChange={(e) => onChange({ query: e.target.value })}
        />
      </label>
      <label className="field">
        <span>Universo</span>
        <select value={filters.universe} onChange={(e) => onChange({ universe: e.target.value })}>
          <option value="all">Todos los universos</option>
          {universes.map(({ name, count }) => (
            <option key={name} value={name}>{name} ({count})</option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>Ordenar</span>
        <select value={filters.sort} onChange={(e) => onChange({ sort: e.target.value })}>
          <option value="id">Nº de registro</option>
          <option value="name-asc">Nombre A–Z</option>
          <option value="name-desc">Nombre Z–A</option>
          <option value="pilots">Más pilotos</option>
        </select>
      </label>
      <label className="field field--check">
        <input
          type="checkbox"
          checked={filters.onlyWithImage}
          onChange={(e) => onChange({ onlyWithImage: e.target.checked })}
        />
        <span>Solo con imagen</span>
      </label>
    </section>
  );
}
