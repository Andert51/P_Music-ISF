import React from 'react';
import { usePlayerStore } from '../store/playerStore';
import { AudioVisualizer } from './AudioVisualizer';

// Componente panel de "Now Playing" que muestra la canción actual, su información y un visualizador de audio.
export const NowPlayingPanel: React.FC = () => {
  // Obtención del estado de la canción actual y el estado de reproducción desde el store.
  const { currentSong, isPlaying } = usePlayerStore();

  // Si no hay canción actual, no renderizar nada.
  if (!currentSong) return null;

  // Renderizado del panel con la información de la canción y el visualizador de audio.
  return (
    // Panel lateral fijo en la derecha de la pantalla.
    <aside className="fixed right-0 top-0 h-full w-72 bg-gray-900 text-white p-4 shadow-lg z-40 flex flex-col">
      <div className="mb-4">
        <img
          src={currentSong.cover || '/default-cover.png'}
          alt={currentSong.title}
          className="w-full h-40 object-cover rounded"
        />
      </div>
      <div className="mb-2 font-bold text-lg">{currentSong.title}</div>
      <div className="mb-4 text-sm text-gray-300">{currentSong.artist}</div>
      <AudioVisualizer />
      <div className="mt-6 text-center">
        {isPlaying ? 'Reproduciendo' : 'Pausado'}
      </div>
    </aside>
  );
};
// Fin del componente NowPlayingPanel.