import React from 'react';

// Componente visualizador de audio que muestra barras animadas representando el audio en reproducción, utilizado en el panel de "Now Playing".
export const AudioVisualizer: React.FC = () => (
  // Contenedor de las barras del visualizador con animación de pulso.
  <div className="flex gap-1 items-end h-6">
    {[...Array(12)].map((_, i) => (
      <div
        key={i}
        className="w-1 bg-blue-400 animate-pulse"
        style={{ height: `${Math.random() * 24 + 8}px` }}
      />
    ))}
  </div>
);
// Fin del componente AudioVisualizer.