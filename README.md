# GundamWiki · React

Wiki de trajes Gundam hecha con **React 19** y Vite. Es la práctica 2 (GundamWiki con JavaScript) rehecha con componentes, props, estado y efectos. Usa la [Gundam API](https://gundam-api.pages.dev) para mostrar los 828 trajes, buscarlos por nombre o piloto, filtrarlos por universo y ver la ficha de cada uno.

Novedades respecto a la práctica 2:
- **Favoritos**: marca trajes con la estrella ☆ y fíltralos con "Solo favoritos". Se guardan en localStorage.
- **Traje aleatorio**: abre la ficha de un traje al azar entre los que pasan los filtros.

## Cómo probarlo

Necesitas Node.js 20 o superior.

```bash
npm install
npm run dev
```

Después abre `http://localhost:5173`.

## Estructura

```
src/
├── main.jsx              Monta <App /> en el #root
├── App.jsx               Estado principal (filtros, página, favoritos) y vistas
├── index.css             Estilos
├── api/                  Peticiones a la API y caché (igual que en la práctica 2)
├── logic/                Limpieza de datos, filtros y estadísticas (igual que en la práctica 2)
├── hooks/
│   ├── useGundams.js     Descarga los trajes: status, error, reload
│   ├── useLocalStorage.js  useState que se guarda en localStorage
│   └── useHash.js        Hash de la URL para saber qué ficha abrir
└── components/
    ├── Header.jsx / Footer.jsx
    ├── Filters.jsx       Buscador, selects, checkboxes y botón aleatorio
    ├── Stats.jsx         Estadísticas de los trajes filtrados
    ├── GundamList.jsx    Rejilla + "Cargar más"
    ├── GundamCard.jsx    Tarjeta de un traje
    ├── GundamDetail.jsx  Ficha completa
    ├── GundamImage.jsx   Imagen con imagen de reserva si falla
    ├── FavoriteButton.jsx
    └── States.jsx        Loading, ErrorMessage y EmptyMessage
```

## Decisiones de React

- **Estado mínimo**: `App` solo guarda `filters`, `visible` (cuántos se muestran) y `favorites`. La lista filtrada, los universos, las estadísticas y el traje seleccionado se **derivan** en cada render.
- **Lifting state up**: los filtros viven en `App` y bajan por props a `Filters` (inputs controlados) y a `GundamList`.
- **Efectos solo donde hace falta**:
  - `useGundams`: pide los datos al montar y al pulsar "Actualizar". El cleanup ignora respuestas que llegan tarde.
  - `useHash`: escucha `hashchange` y quita el listener en el cleanup.
  - `useLocalStorage`: guarda el valor cuando cambia.
  - `GundamDetail`: sube al principio y cambia el título de la pestaña; el cleanup lo restaura.
  - Volver a la primera página al cambiar un filtro se hace en el manejador del evento, no en un efecto.
- **Keys estables**: los trajes usan su `id`, los universos su nombre y los pilotos su nombre (sin repetidos).
- **Custom hooks (bonus)**: `useGundams`, `useLocalStorage` y `useHash`.
- `useDeferredValue` sustituye al debounce de la práctica 2 para que escribir en el buscador no se trabe.

## Uso de IA

He usado Claude para ayudar con la practica, dividirla en componentes y generar parte del código.

Ejemplos de prompts reales:
- "Como importo los sistemas que he realizado en la práctica 2 a la práctica 3"
  La IA sugirió reutilizar la API, la caché y la lógica de la práctica 2 y la IA rehízo la parte visual con componentes de React.

- "Ve realizando las partes como si fuese un proyecto real para que las revise"
  Cada vez que la IA realizaba un cambio lo revisaba antes de guardarlo.

## Autopsia

1. La API sigue sin permitir peticiones desde el navegador (CORS), así que se mantiene el proxy de Vite en `vite.config.js`. Solo funciona con `npm run dev` o `npm run preview`.

2. En la práctica 2 la página se repintaba entera con `innerHTML` en cada cambio. Ahora React solo actualiza lo que cambia según el estado.

3. En modo desarrollo `StrictMode` ejecuta los efectos dos veces. Por eso `useGundams` tiene un cleanup que ignora la primera respuesta y no se guarda dos veces el resultado.
