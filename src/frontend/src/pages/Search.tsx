import React, { useState } from 'react';

export const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ id: string; title: string; artist: string }[]>([]);

  const handleSearch = () => {
    // Simulación de búsqueda
    setResults([
      { id: 's1', title: 'Canción encontrada', artist: 'Artista' },
    ]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Buscar</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar canciones, artistas..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="p-2 border rounded w-64"
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Buscar
        </button>
      </div>
      <ul>
        {results.map(song => (
          <li key={song.id} className="py-2 border-b flex justify-between">
            <span>{song.title}</span>
            <span className="text-gray-400">{song.artist}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};