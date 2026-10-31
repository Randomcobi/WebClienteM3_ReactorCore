// Componente principal de la app

export default function App() {
  return (
    <>
      <header className="site-header">
        <a className="logo" href="#/">GUNDAM<span>WIKI</span></a>
        <p className="tagline">Archivo de mobile suits de todas las líneas temporales</p>
      </header>

      <main className="layout">
        <p className="muted">Aquí irá el hangar de trajes.</p>
      </main>

      <footer className="site-footer">
        <span>
          Datos: <a href="https://gundam-api.pages.dev" target="_blank" rel="noopener noreferrer">Gundam API</a> · Gundam Wiki (Fandom)
        </span>
      </footer>
    </>
  );
}
