import React from 'react';

interface Playlist {
  id: string;
  name: string;
  songCount: number;
}

export const Library: React.FC = () => {
  // Simulación de datos
  const playlists: Playlist[] = [
    { id: 'p1', name: 'Favoritas', songCount: 12 },
    { id: 'p2', name: 'Para estudiar', songCount: 8 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mi Biblioteca</h1>
      <ul>
        {playlists.map(pl => (
          <li key={pl.id} className="py-2 border-b flex justify-between">
            <span>{pl.name}</span>
            <span className="text-gray-400">{pl.songCount} canciones</span>
          </li>
        ))}
      </ul>
    </div>
  );
};