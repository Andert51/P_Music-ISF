import React from 'react';

interface Album {
  id: string;
  title: string;
  artist: string;
  cover: string;
  songs: { id: string; title: string; duration: string }[];
}

export const AlbumDetail: React.FC = () => {
  // Simulación de datos
  const album: Album = {
    id: '1',
    title: 'Álbum de ejemplo',
    artist: 'Artista',
    cover: '/default-cover.png',
    songs: [
      { id: 's1', title: 'Canción 1', duration: '3:45' },
      { id: 's2', title: 'Canción 2', duration: '4:12' },
    ],
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <img src={album.cover} alt={album.title} className="w-32 h-32 rounded mr-6" />
        <div>
          <h1 className="text-3xl font-bold">{album.title}</h1>
          <div className="text-lg text-gray-500">{album.artist}</div>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-2">Canciones</h2>
      <ul>
        {album.songs.map(song => (
          <li key={song.id} className="py-2 border-b flex justify-between">
            <span>{song.title}</span>
            <span className="text-gray-400">{song.duration}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};