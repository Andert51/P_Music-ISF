import React, { useState } from 'react';

export const UploadSong: React.FC = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para subir la canción
    alert('Canción subida (simulado)');
    setTitle('');
    setArtist('');
    setFile(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Subir Canción</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Artista"
          value={artist}
          onChange={e => setArtist(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="file"
          accept="audio/*"
          onChange={e => setFile(e.target.files?.[0] || null)}
          className="w-full"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Subir
        </button>
      </form>
    </div>
  );
};