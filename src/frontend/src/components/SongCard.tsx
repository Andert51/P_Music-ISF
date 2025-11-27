import React from 'react'
import { motion } from 'framer-motion'
import { Play, Pause } from 'lucide-react'
import { Song } from '@/types'
import { usePlayerStore } from '@/store/playerStore'

interface SongCardProps {
  song: Song
  index: number
  allSongs: Song[]
}

export const SongCard: React.FC<SongCardProps> = ({ song, index, allSongs }) => {
  const { currentSong, isPlaying, playSong, togglePlay, playQueue } = usePlayerStore()
  const isCurrentSong = currentSong?.id === song.id

  const handlePlay = () => {
    if (isCurrentSong) {
      togglePlay()
    } else {
      playQueue(allSongs, index)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04 }}
      className="group relative bg-gruvbox-bg1 rounded-xl shadow-lg hover:shadow-gruvbox-aqua/30 p-4 cursor-pointer hover:scale-105 transition-all"
    >
      <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
        <img
          src={song.cover_url || '/placeholder-album.jpg'}
          alt={song.title}
          className="w-full h-full object-cover"
        />
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handlePlay}
        >
          <div className="bg-gruvbox-aqua rounded-full p-4 hover:scale-110 transition-transform">
            {isCurrentSong && isPlaying ? (
              <Pause className="w-6 h-6 text-white" fill="currentColor" />
            ) : (
              <Play className="w-6 h-6 text-white" fill="currentColor" />
            )}
          </div>
        </motion.button>
      </div>
      <h3 className="text-gruvbox-fg font-semibold truncate mb-1">{song.title}</h3>
      <p className="text-gruvbox-fg4 text-sm truncate">{song.artist}</p>
      {isCurrentSong && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          className="absolute bottom-0 left-0 h-1 bg-gruvbox-aqua"
        />
      )}
    </motion.div>
  )
}