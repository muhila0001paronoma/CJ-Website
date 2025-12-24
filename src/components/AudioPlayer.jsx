import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './AudioPlayer.css'

const AudioPlayer = ({
  mode = 'modal',
  song,
  queue = [],
  currentIndex = 0,
  onSelectSongId,
  onNext,
  onPrev,
  isOpen,
  onClose
}) => {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1.0)
  const [isMuted, setIsMuted] = useState(false)
  const [isQueueOpen, setIsQueueOpen] = useState(false)
  const [repeatMode, setRepeatMode] = useState(() => {
    try {
      const v = localStorage.getItem('cj_music_repeat')
      return v === 'all' || v === 'one' ? v : 'off'
    } catch {
      return 'off'
    }
  }) // 'off' | 'all' | 'one'

  useEffect(() => {
    if (isOpen && audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
    } else if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }, [isOpen])

  useEffect(() => {
    try {
      localStorage.setItem('cj_music_repeat', repeatMode)
    } catch {}
  }, [repeatMode])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !isOpen || !song) return

    setCurrentTime(0)
    setDuration(0)
    audio.load()
    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
  }, [song?.audio, isOpen])
  

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (mode !== 'page') onClose()
      }
    }

    const handleShortcuts = (e) => {
      const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : ''
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return

      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault()
        togglePlayPause()
      }
      if (e.key === 'r' || e.key === 'R') cycleRepeat()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('keydown', handleShortcuts)
      if (mode !== 'page') document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleShortcuts)
      if (mode !== 'page') document.body.style.overflow = ''
    }
  }, [isOpen, onClose, isPlaying, repeatMode, currentIndex, queue.length])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)

    // Set initial volume
    audio.volume = volume
    audio.muted = isMuted

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
    }
  }, [volume, isMuted])

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(() => {})
      }
      setIsPlaying(!isPlaying)
    }
  }

  const formatTime = (time) => {
    if (!time) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleSeek = (e) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const percent = (e.clientX - rect.left) / rect.width
      audioRef.current.currentTime = percent * duration
    }
  }

  const seekBy = (deltaSeconds) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const next = Math.min(duration, Math.max(0, audio.currentTime + deltaSeconds))
    audio.currentTime = next
  }

  const handleProgressKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      seekBy(-5)
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      seekBy(5)
    }
    if (e.key === 'Home') {
      e.preventDefault()
      if (audioRef.current) audioRef.current.currentTime = 0
    }
    if (e.key === 'End') {
      e.preventDefault()
      if (audioRef.current && duration) audioRef.current.currentTime = duration
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
      if (newVolume > 0 && isMuted) {
        setIsMuted(false)
        audioRef.current.muted = false
      }
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted
      setIsMuted(newMutedState)
      audioRef.current.muted = newMutedState
    }
  }

  if (!isOpen || !song) return null

  const canSelect = typeof onSelectSongId === 'function'
  const canNavigate = queue.length > 1 && (canSelect || (typeof onNext === 'function' && typeof onPrev === 'function'))

  const selectIndex = (idx) => {
    if (!queue[idx]) return
    if (canSelect) {
      onSelectSongId(queue[idx].id)
      return
    }
    // Fallback: only supports adjacent navigation
    if (idx === currentIndex + 1 && typeof onNext === 'function') onNext()
    if (idx === currentIndex - 1 && typeof onPrev === 'function') onPrev()
  }

  const cycleRepeat = () => {
    setRepeatMode((m) => {
      if (m === 'off') return 'all'
      if (m === 'all') return 'one'
      return 'off'
    })
  }

  const handleNext = () => {
    if (!canNavigate) return
    const next = (currentIndex + 1) % queue.length
    selectIndex(next)
  }

  const handlePrev = () => {
    if (!canNavigate) return
    const prev = (currentIndex - 1 + queue.length) % queue.length
    selectIndex(prev)
  }

  const nextSong =
    queue && queue.length > 0
      ? queue[Math.min(queue.length - 1, currentIndex + 1)]
      : null

  const shell = (
    <motion.div
      className="audio-player-shell"
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{
        opacity: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
        y: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
        layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
      }}
      onClick={(e) => e.stopPropagation()}
    >
          <motion.div
            className="audio-player-content"
            layout
            transition={{ layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
          >
            <div className="audio-player-topbar">
              {mode === 'page' && (
                <button className="audio-player-back-btn" onClick={onClose} aria-label="Back">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                  <span className="audio-player-back-text">Back</span>
                </button>
              )}
              <div className="audio-player-title">
                <span className="audio-player-title-text">{song.title}</span>
                {song.subtitle && <span className="audio-player-subtitle-text">{song.subtitle}</span>}
              </div>
              <div className="audio-player-topbar-actions">
                <button
                  className={`audio-player-icon-btn ${isQueueOpen ? 'is-active' : ''}`}
                  onClick={() => setIsQueueOpen((v) => !v)}
                  aria-label={isQueueOpen ? 'Close queue' : 'Open queue'}
                  aria-pressed={isQueueOpen}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                    <path d="M4 6h12"></path>
                    <path d="M4 12h12"></path>
                    <path d="M4 18h8"></path>
                    <path d="M17 10v8"></path>
                    <path d="M17 10l3 2-3 2"></path>
                  </svg>
                </button>
                {mode !== 'page' && (
                  <button className="audio-player-icon-btn" onClick={onClose} aria-label="Close player">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="audio-player-main">
              <div className="audio-player-art">
                <img src={song.thumbnail} alt={song.title} className="audio-player-art-img" />
              </div>

              <div className="audio-player-panels">
                <div className="audio-player-panel">
                  <div className="audio-player-panel-header">
                    <span className="audio-player-panel-title">Credits</span>
                  </div>
                  <div className="audio-player-panel-body">
                    <div className="audio-player-credit-line">
                      <span className="audio-player-credit-label">Artist</span>
                      <span className="audio-player-credit-value">{song.artist || 'CJGERMANY'}</span>
                    </div>
                    <div className="audio-player-credit-line">
                      <span className="audio-player-credit-label">Track</span>
                      <span className="audio-player-credit-value">{song.title}</span>
                    </div>
                  </div>
                </div>

                <div className="audio-player-panel">
                  <div className="audio-player-panel-header">
                    <span className="audio-player-panel-title">Next in queue</span>
                    <button
                      className="audio-player-panel-action"
                      type="button"
                      onClick={() => setIsQueueOpen(true)}
                    >
                      Open queue
                    </button>
                  </div>
                  <div className="audio-player-panel-body">
                    {nextSong ? (
                      <div className="audio-player-next">
                        <img className="audio-player-next-img" src={nextSong.thumbnail} alt={nextSong.title} />
                        <div className="audio-player-next-meta">
                          <div className="audio-player-next-title">{nextSong.title}</div>
                          <div className="audio-player-next-sub">{nextSong.artist || ' '}</div>
                        </div>
                      </div>
                    ) : (
                      <div className="audio-player-next-empty">Queue is empty.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="audio-player-bottombar">
              <div className="audio-player-mini">
                <img src={song.thumbnail} alt={song.title} className="audio-player-mini-img" />
                <div className="audio-player-mini-meta">
                  <div className="audio-player-mini-title">{song.title}</div>
                  <div className="audio-player-mini-sub">{song.artist || song.subtitle || ''}</div>
                </div>
              </div>

              <div className="audio-player-controls">
                <div className="audio-player-transport">
                  <button
                    className="audio-player-transport-btn"
                    onClick={handlePrev}
                    aria-label="Previous"
                    disabled={!canNavigate}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M18 18L9.5 12 18 6v12zM7 6h2.5v12H7V6z"></path>
                    </svg>
                  </button>

                  <button className="audio-player-play-btn" onClick={togglePlayPause} aria-label={isPlaying ? 'Pause' : 'Play'}>
                    {isPlaying ? (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                      </svg>
                    ) : (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </button>

                  <button
                    className="audio-player-transport-btn"
                    onClick={handleNext}
                    aria-label="Next"
                    disabled={!canNavigate}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M6 18l8.5-6L6 6v12zM14.5 6H17v12h-2.5V6z"></path>
                    </svg>
                  </button>

                  <button
                    className={`audio-player-transport-btn audio-player-toggle-btn ${repeatMode !== 'off' ? 'is-active' : ''}`}
                    onClick={cycleRepeat}
                    aria-label={
                      repeatMode === 'off'
                        ? 'Enable repeat all'
                        : repeatMode === 'all'
                          ? 'Enable repeat one'
                          : 'Disable repeat'
                    }
                    aria-pressed={repeatMode !== 'off'}
                  >
                    <span className="audio-player-repeat-wrap" data-repeat={repeatMode}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                        <path d="M17 2l4 4-4 4"></path>
                        <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                        <path d="M7 22l-4-4 4-4"></path>
                        <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                      </svg>
                      {repeatMode === 'one' && <span className="audio-player-repeat-one">1</span>}
                    </span>
                  </button>
                </div>

                <div className="audio-player-progress">
                  <span className="audio-player-time">{formatTime(currentTime)}</span>
                  <div
                    className="audio-player-progress-container"
                    onClick={handleSeek}
                    onKeyDown={handleProgressKeyDown}
                    role="slider"
                    tabIndex={0}
                    aria-label="Seek"
                    aria-valuemin={0}
                    aria-valuemax={Math.floor(duration || 0)}
                    aria-valuenow={Math.floor(currentTime || 0)}
                  >
                    <div className="audio-player-progress-bar">
                      <div
                        className="audio-player-progress-fill"
                        style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="audio-player-time">{formatTime(duration)}</span>
                </div>
              </div>

              <div className="audio-player-volume">
                <button className="audio-player-icon-btn" onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
                  {isMuted || volume === 0 ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                      <path d="M23 9l-6 6M17 9l6 6"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                    </svg>
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="audio-player-volume-slider"
                  aria-label="Volume"
                />
              </div>
            </div>
          </motion.div>

          <motion.aside
            className="audio-player-queue"
            aria-hidden={!isQueueOpen}
            initial={false}
            animate={{
              width: isQueueOpen ? 380 : 0,
              x: isQueueOpen ? 0 : 380,
              opacity: isQueueOpen ? 1 : 0
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ pointerEvents: isQueueOpen ? 'auto' : 'none' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="audio-player-queue-header">
              <div className="audio-player-queue-title">Queue</div>
              <button className="audio-player-icon-btn" onClick={() => setIsQueueOpen(false)} aria-label="Close queue">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="audio-player-queue-list">
              {queue.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  className={`audio-player-queue-item ${idx === currentIndex ? 'is-active' : ''}`}
                  onClick={() => selectIndex(idx)}
                  aria-label={`Play ${s.title}`}
                >
                  <img className="audio-player-queue-item-img" src={s.thumbnail} alt={s.title} />
                  <div className="audio-player-queue-item-meta">
                    <div className="audio-player-queue-item-title">{s.title}</div>
                    <div className="audio-player-queue-item-sub">{s.artist || s.subtitle || ''}</div>
                  </div>
                </button>
              ))}
            </div>
          </motion.aside>

          <audio
            ref={audioRef}
            src={song.audio}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => {
              if (repeatMode === 'one') {
                const a = audioRef.current
                if (a) {
                  a.currentTime = 0
                  a.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
                }
                return
              }

              setIsPlaying(false)
              handleNext()
            }}
          />
        </motion.div>
  )

  if (mode === 'page') {
    return <div className="audio-player-page">{shell}</div>
  }

  return (
    <AnimatePresence>
      <motion.div
        className="audio-player-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {shell}
      </motion.div>
    </AnimatePresence>
  )
}

export default AudioPlayer

