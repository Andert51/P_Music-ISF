import React from 'react';

interface Playlist {
  id: string;
  name: string;
  songs: { id: string; title: string; artist: string }[];
}

export const PlaylistDetail: React.FC = () => {
  // Simulación de datos
  const playlist: Playlist = {
    id: 'p1',
    name: 'Favoritas',
    songs: [
      { id: 's1', title: 'Canción 1', artist: 'Artista 1' },
      { id: 's2', title: 'Canción 2', artist: 'Artista 2' },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{playlist.name}</h1>
      <ul>
        {playlist.songs.map(song => (
          <li key={song.id} className="py-2 border-b flex justify-between">
            <span>{song.title}</span>
            <span className="text-gray-400">{song.artist}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};