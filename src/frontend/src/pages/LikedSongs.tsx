import React from 'react';

export const LikedSongs: React.FC = () => {
  // Simulación de datos
  const likedSongs = [
    { id: 's1', title: 'Canción favorita 1', artist: 'Artista 1' },
    { id: 's2', title: 'Canción favorita 2', artist: 'Artista 2' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Canciones que me gustan</h1>
      <ul>
        {likedSongs.map(song => (
          <li key={song.id} className="py-2 border-b flex justify-between">
            <span>{song.title}</span>
            <span className="text-gray-400">{song.artist}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};