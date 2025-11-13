/**
 * Player Store - Sprint 2
 * Versión final (Sesión 2)
 * Se añade soporte para colas de reproducción y control de canciones
 */

import { create } from 'zustand'
import { Howl } from 'howler'
import type { Song } from '../types/intex.ts'

interface PlayerState {
  currentSong: Song | null
  isPlaying: boolean
  volume: number
  queue: Song[]
  currentIndex: number
  howl: Howl | null

  // Acciones completas
  playSong: (song: Song) => void
  playQueue: (songs: Song[], startIndex: number) => void
  togglePlay: () => void
  nextSong: () => void
  previousSong: () => void
  setVolume: (volume: number) => void
  seek: (time: number) => void
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  volume: 0.7,
  queue: [],
  currentIndex: 0,
  howl: null,

  playSong: (song: Song) => {
    const { howl } = get()
    if (howl) howl.unload()

    const audioUrl = song.file_path.startsWith('http')
      ? song.file_path
      : `http://localhost:8002${song.file_path}`

    const newHowl = new Howl({
      src: [audioUrl],
      html5: true,
      volume: get().volume,
      format: ['mp3'],
      onloaderror: (_id, error) => console.error('❌ Error cargando audio:', error),
      onend: () => get().nextSong(),
      onplayerror: (_id, error) => {
        console.error('❌ Error reproduciendo:', error)
        newHowl.once('unlock', () => newHowl.play())
      },
    })

    newHowl.play()
    set({ currentSong: song, howl: newHowl, isPlaying: true, queue: [song], currentIndex: 0 })
  },

  playQueue: (songs: Song[], startIndex: number) => {
    if (songs.length === 0) return
    const { howl } = get()
    if (howl) howl.unload()

    const song = songs[startIndex]
    const audioUrl = song.file_path.startsWith('http')
      ? song.file_path
      : `http://localhost:8002${song.file_path}`

    const newHowl = new Howl({
      src: [audioUrl],
      html5: true,
      volume: get().volume,
      format: ['mp3'],
      onloaderror: (_id, error) => console.error('❌ Error cargando audio:', error),
      onend: () => get().nextSong(),
      onplayerror: (_id, error) => {
        console.error('❌ Error reproduciendo:', error)
        newHowl.once('unlock', () => newHowl.play())
      },
    })

    newHowl.play()
    set({
      currentSong: song,
      howl: newHowl,
      isPlaying: true,
      queue: songs,
      currentIndex: startIndex,
    })
  },

  togglePlay: () => {
    const { howl, isPlaying } = get()
    if (!howl) return

    if (isPlaying) howl.pause()
    else howl.play()

    set({ isPlaying: !isPlaying })
  },

  nextSong: () => {
    const { queue, currentIndex } = get()
    if (currentIndex < queue.length - 1) get().playQueue(queue, currentIndex + 1)
  },

  previousSong: () => {
    const { queue, currentIndex, howl } = get()
    if (howl && howl.seek() > 3) {
      howl.seek(0)
    } else if (currentIndex > 0) {
      get().playQueue(queue, currentIndex - 1)
    }
  },

  setVolume: (volume: number) => {
    const { howl } = get()
    if (howl) howl.volume(volume)
    set({ volume })
  },

  seek: (time: number) => {
    const { howl } = get()
    if (howl) howl.seek(time)
  },
}))
