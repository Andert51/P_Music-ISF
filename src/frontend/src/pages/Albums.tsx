import React from 'react';

interface Album {
  id: string;
  title: string;
  artist: string;
  cover: string;
}

export const Albums: React.FC = () => {
  // Simulación de datos
  const albums: Album[] = [
    { id: '1', title: 'Álbum 1', artist: 'Artista 1', cover: '/default-cover.png' },
    { id: '2', title: 'Álbum 2', artist: 'Artista 2', cover: '/default-cover.png' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Álbumes</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {albums.map(album => (
          <div key={album.id} className="bg-gray-800 rounded p-4 text-white">
            <img src={album.cover} alt={album.title} className="w-full h-32 object-cover rounded mb-2" />
            <div className="font-semibold">{album.title}</div>
            <div className="text-sm text-gray-400">{album.artist}</div>
          </div>
        ))}
      </div>
    </div>
  );
};