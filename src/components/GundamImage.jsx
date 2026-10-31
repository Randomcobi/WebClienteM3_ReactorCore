// Imagen del traje con una imagen de reserva si falla

import { useState } from 'react';

const PLACEHOLDER_IMG = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" fill="#1b2433"/><text x="60" y="66" font-family="monospace" font-size="12" fill="#7d8aa5" text-anchor="middle">NO DATA</text></svg>',
)}`;

export default function GundamImage({ gundam, className }) {
  const [failed, setFailed] = useState(false);
  const src = !gundam.image || failed ? PLACEHOLDER_IMG : gundam.image;

  return (
    <img
      className={className}
      src={src}
      alt={gundam.fullName}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
}
