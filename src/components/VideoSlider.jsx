import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './VideoSlider.css'

const VideoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const videoRefs = useRef([])
  const containerRef = useRef(null)
  const scrollTimeoutRef = useRef(null)

  const videos = [
    { id: 1, src: '/video/video1.mp4' },
    { id: 2, src: '/video/video2.mp4' },
  ]

  useEffect(() => {
    // Detect when video slider is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting)
        })
      },
      { threshold: 0.5 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    // Detect scroll events
    const handleScroll = () => {
      setIsScrolling(true)
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      
      // Hide buttons after scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 1500)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('wheel', handleScroll, { passive: true })
    window.addEventListener('touchmove', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', handleScroll)
      window.removeEventListener('touchmove', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    // Auto-advance videos every 5 seconds
    const interval = setInterval(() => {
      if (isPlaying && !isScrolling) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying, videos.length, isScrolling])

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

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length)
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
    <div className="video-slider-container" ref={containerRef}>
      <div className="video-slider-wrapper">
        <AnimatePresence mode="wait">
          {videos.map((video, index) => {
            if (index !== currentIndex) return null

            return (
              <motion.div
                key={video.id}
                className={`video-slide ${isScrolling ? 'scrolling' : ''} ${isInView ? 'in-view' : ''}`}
                initial={{ opacity: 0, scale: 1 }}
                animate={{ 
                  opacity: 1,
                  scale: isScrolling ? 1 : 1,
                  z: 0
                }}
                exit={{ opacity: 0, scale: 1 }}
                transition={{ 
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1]
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

      {/* Previous Button */}
      <button 
        className={`slider-nav-button slider-prev ${isScrolling ? 'visible' : 'hidden'}`}
        onClick={goToPrevious}
        aria-label="Previous video"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>

      {/* Next Button */}
      <button 
        className={`slider-nav-button slider-next ${isScrolling ? 'visible' : 'hidden'}`}
        onClick={goToNext}
        aria-label="Next video"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>

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

