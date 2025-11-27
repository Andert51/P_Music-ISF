import React, { useState } from 'react';

// Definición de la interfaz Playlist para tipar las listas de reproducción.
interface Playlist {
  id: string;
  name: string;
}

// Propiedades del componente AddToPlaylistModal, que incluye las listas de reproducción y funciones de manejo, así como el estado de apertura del modal.
interface AddToPlaylistModalProps {
  open: boolean;
  onClose: () => void;
  playlists: Playlist[];
  onAdd: (playlistId: string) => void;
  onCreate: (name: string) => void;
}

// Componente modal para agregar canciones a una lista de reproducción existente o crear una nueva.
// Muestra un modal con opciones para seleccionar una playlist o crear una nueva.
export const AddToPlaylistModal: React.FC<AddToPlaylistModalProps> = ({
  open,
  onClose,
  playlists,
  onAdd,
  onCreate,
}) => {
  const [newPlaylist, setNewPlaylist] = useState('');

  if (!open) return null;

  return (
    // Fondo oscuro que cubre toda la pantalla y centra el modal.
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4">Agregar a playlist</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Nueva playlist"
            value={newPlaylist}
            onChange={e => setNewPlaylist(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <button
            className="w-full bg-blue-500 text-white py-1 rounded"
            onClick={() => {
              if (newPlaylist.trim()) {
                onCreate(newPlaylist.trim());
                setNewPlaylist('');
              }
            }}
          >
            Crear y agregar
          </button>
        </div>
        <div>
          <div className="mb-2 font-semibold">Tus playlists:</div>
          {playlists.map(pl => (
            <button
              key={pl.id}
              className="block w-full text-left px-2 py-1 hover:bg-blue-100 dark:hover:bg-blue-900 rounded"
              onClick={() => onAdd(pl.id)}
            >
              {pl.name}
            </button>
          ))}
        </div>
        <button
          className="mt-4 w-full bg-gray-300 dark:bg-gray-700 py-1 rounded"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
// Fin del componente AddToPlaylistModal.