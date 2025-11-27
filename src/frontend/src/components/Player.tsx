import { useState, useEffect } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react'
import { usePlayerStore } from '../store/playerStore'

const Player = () => {
  const {
    currentSong,
    isPlaying,
    volume,
    togglePlay,
    nextSong,
    previousSong,
    setVolume,
    howl,
  } = usePlayerStore()

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isSeeking, setIsSeeking] = useState(false)

  useEffect(() => {
    if (!howl || isSeeking) return
    const interval = setInterval(() => {
      setCurrentTime(howl.seek() as number)
      setDuration(howl.duration())
    }, 100)
    return () => clearInterval(interval)
  }, [howl, isSeeking])

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return ${mins}:${secs.toString().padStart(2, '0')}
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSeeking(true)
    setCurrentTime(parseFloat(e.target.value))
  }

  const handleSeekEnd = (e: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
    const input = e.currentTarget as HTMLInputElement
    const newTime = parseFloat(input.value)
    if (!isNaN(newTime) && howl && howl.state() === 'loaded') {
      howl.seek(newTime)
      setCurrentTime(newTime)
    }
    setTimeout(() => setIsSeeking(false), 100)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setVolume(value)
  }

  const toggleMute = () => {
    if (volume > 0) {
      setVolume(0)
    } else {
      setVolume(0.7)
    }
  }

  if (!currentSong) return null

  const coverPath = currentSong.cover_image || currentSong.cover_url
  const coverUrl = coverPath
    ? (coverPath.startsWith('http') ? coverPath : http://localhost:8003${coverPath})
    : 'https://via.placeholder.com/300x300?text=No+Cover'

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gruvbox-bg via-gruvbox-bg1 to-gruvbox-bg2 border-t border-gruvbox-aqua/20 backdrop-blur-lg z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <img
              src={coverUrl}
              alt={currentSong.title}
              className="w-14 h-14 rounded-lg object-cover shadow-lg"
              onError={e => {
                e.currentTarget.src = 'https://via.placeholder.com/300x300?text=No+Cover'
              }}
            />
            <div className="min-w-0">
              <h3 className="text-gruvbox-fg font-semibold truncate">
                {currentSong.title}
              </h3>
              <p className="text-gruvbox-fg4 text-sm truncate">
                {currentSong.artist}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 flex-[2]">
            <div className="flex items-center gap-4">
              <button
                onClick={previousSong}
                className="text-gruvbox-fg4 hover:text-gruvbox-aqua transition-colors"
                aria-label="Anterior"
              >
                <SkipBack size={20} />
              </button>
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-gruvbox-aqua to-gruvbox-purple hover:from-gruvbox-yellow hover:to-gruvbox-aqua flex items-center justify-center shadow-lg transition-all"
                aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
              >
                {isPlaying ? (
                  <Pause size={20} className="text-white fill-white" />
                ) : (
                  <Play size={20} className="text-white fill-white ml-0.5" />
                )}
              </button>
              <button
                onClick={nextSong}
                className="text-gruvbox-fg4 hover:text-gruvbox-aqua transition-colors"
                aria-label="Siguiente"
              >
                <SkipForward size={20} />
              </button>
            </div>
            <div className="flex items-center gap-2 w-full max-w-xl">
              <span className="text-xs text-gruvbox-fg4 w-10 text-right">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                onMouseUp={handleSeekEnd}
                onTouchEnd={handleSeekEnd}
                className="flex-1 h-1 bg-gruvbox-bg2 rounded-lg appearance-none cursor-pointer player-seekbar"
                style={{
                  background: linear-gradient(to right, #8ec07c 0%, #8ec07c ${progress}%, #504945 ${progress}%, #504945 100%),
                }}
              />
              <span className="text-xs text-gruvbox-fg4 w-10">
                {formatTime(duration)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 min-w-[140px] justify-end">
            <button
              onClick={toggleMute}
              className="text-gruvbox-fg4 hover:text-gruvbox-aqua transition-colors flex-shrink-0"
              aria-label="Volumen"
            >
              {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-gruvbox-bg2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #8ec07c 0%, #8ec07c ${
                  volume * 100
                }%, #504945 ${volume * 100}%, #504945 100%)`,
              }}
            />
          </div>
        </div>
      </div>
      <style>{`
        .player-seekbar::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #8ec07c;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        .player-seekbar::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #8ec07c;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #8ec07c;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        input[type="range"]::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #8ec07c;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  )
}

export default Player