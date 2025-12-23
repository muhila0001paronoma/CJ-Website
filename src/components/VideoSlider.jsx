import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './VideoSlider.css'

const VideoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRefs = useRef([])

  const videos = [
    { id: 1, src: '/video/video1.mp4' },
    { id: 2, src: '/video/video2.mp4' },
    { id: 3, src: '/video/video3.mp4' },
    { id: 4, src: '/video/video4.mp4' },
    { id: 5, src: '/video/video5.mp4' },
  ]

  useEffect(() => {
    // Auto-advance videos every 5 seconds
    const interval = setInterval(() => {
      if (isPlaying) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying, videos.length])

  useEffect(() => {
    // Play current video when index changes
    const currentVideo = videoRefs.current[currentIndex]
    if (currentVideo) {
      currentVideo.play().catch((error) => {
        console.log('Autoplay prevented:', error)
      })
    }

    // Pause other videos
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentIndex) {
        video.pause()
        video.currentTime = 0
      }
    })
  }, [currentIndex])

  const handleVideoEnd = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    const currentVideo = videoRefs.current[currentIndex]
    if (currentVideo) {
      if (isPlaying) {
        currentVideo.pause()
      } else {
        currentVideo.play()
      }
    }
  }

  return (
    <div className="video-slider-container">
      <div className="video-slider-wrapper">
        <AnimatePresence mode="wait">
          {videos.map((video, index) => {
            if (index !== currentIndex) return null

            return (
              <motion.div
                key={video.id}
                className="video-slide"
                initial={{ opacity: 0, scale: 0.8, z: -100 }}
                animate={{ 
                  opacity: 0.917321,
                  scale: 0.586607,
                  z: 0
                }}
                exit={{ opacity: 0, scale: 0.8, z: 100 }}
                transition={{ 
                  duration: 1.5,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                style={{
                  transform: 'perspective(1200px) scale(0.586607)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  className="slider-video"
                  src={video.src}
                  autoPlay
                  muted
                  loop={false}
                  playsInline
                  onEnded={handleVideoEnd}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
                <div className="video-overlay"></div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className="slider-dots">
        {videos.map((_, index) => (
          <button
            key={index}
            className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Play/Pause Button */}
      <button 
        className="slider-play-pause"
        onClick={togglePlayPause}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? '⏸' : '▶'}
      </button>
    </div>
  )
}

export default VideoSlider

