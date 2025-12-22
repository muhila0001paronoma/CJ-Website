import React, { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './VideoPlayer.css'

const VideoPlayer = ({ video, isOpen, onClose }) => {
  const videoRef = useRef(null)

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play()
    } else if (videoRef.current) {
      videoRef.current.pause()
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen || !video) return null

  return (
    <AnimatePresence>
      <motion.div
        className="video-player-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="video-player-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-button" onClick={onClose} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div className="video-wrapper">
            <video
              ref={videoRef}
              src={video.video}
              controls
              autoPlay
              className="video-element"
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="video-info">
            {video.brand && <p className="video-brand">{video.brand}</p>}
            <h3 className="video-title">{video.title}</h3>
            {video.artist && <p className="video-artist">{video.artist}</p>}
            {video.language && <p className="video-language">{video.language}</p>}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default VideoPlayer

