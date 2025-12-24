import React, { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AudioPlayer from './AudioPlayer'
import { musicSongs } from '../data/musicSongs'

const AudioPlayerPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const state = location.state || {}
  const initialSongId = state.songId ?? null
  const queueIds = Array.isArray(state.queueIds) ? state.queueIds : null

  const queue = useMemo(() => {
    if (!queueIds || queueIds.length === 0) return musicSongs
    const set = new Set(queueIds)
    return musicSongs.filter((s) => set.has(s.id))
  }, [queueIds])

  const [currentSongId, setCurrentSongId] = useState(initialSongId ?? (queue[0]?.id ?? null))

  const rawIndex = queue.findIndex((s) => s.id === currentSongId)
  const currentIndex = rawIndex >= 0 ? rawIndex : 0
  const currentSong = queue[currentIndex] || null

  return (
    <AudioPlayer
      mode="page"
      song={currentSong}
      queue={queue}
      currentIndex={currentIndex}
      onSelectSongId={setCurrentSongId}
      isOpen={true}
      onClose={() => navigate(-1)}
    />
  )
}

export default AudioPlayerPage


