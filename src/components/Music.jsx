import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import VideoPlayer from './VideoPlayer'
import AudioPlayer from './AudioPlayer'
import './Music.css'

// Import background image
import musicBG from '../assets/Music/Music BG.png'

// Import video assets
import video1Thumb from '../assets/Music/video-01-thumbnail.jpg'
import video2Thumb from '../assets/Music/video-02-thumbnail.jpg'
import video3Thumb from '../assets/Music/video-03-thumbnail.jpg'
import video4Thumb from '../assets/Music/video-04-thumbnail.jpg'
import video5Thumb from '../assets/Music/video-05-thumbnail.jpg'
import video1 from '../assets/Music/video-01.mp4'
import video2 from '../assets/Music/video-02.mp4'
import video3 from '../assets/Music/video-03.mp4'
import video4 from '../assets/Music/video-04.mp4'
import video5 from '../assets/Music/video-05.mp4'

// Import song assets
import song1Thumb from '../assets/Music/music-01-thumbnail.jpg'
import song2Thumb from '../assets/Music/music-02-thumbnail.jpg'
import song3Thumb from '../assets/Music/music-03-thumbnail.jpg'
import song4Thumb from '../assets/Music/music-04-thumbnail.jpg'
import song5Thumb from '../assets/Music/music-05-thumbnail.jpg'
import song1 from '../assets/Music/music-01.mp3'
import song2 from '../assets/Music/music-02.mp3'
import song3 from '../assets/Music/music-03.mp3'
import song4 from '../assets/Music/music-04.mp3'
import song5 from '../assets/Music/music-05.mp3'

const Music = () => {
  const videosScrollRef = useRef(null)
  const songsScrollRef = useRef(null)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [selectedSong, setSelectedSong] = useState(null)
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false)
  const [isAudioPlayerOpen, setIsAudioPlayerOpen] = useState(false)

  const videos = [
    { id: 1, brand: 'CJG', title: 'Mayilirage (Tamil Violin Cover)', artist: 'feat. M. Kowtham', thumbnail: video1Thumb, video: video1 },
    { id: 2, brand: 'CJG', title: 'Depression', language: 'Tamil Video', thumbnail: video2Thumb, video: video2 },
    { id: 3, brand: 'CJG', title: 'Vaa Vaathi (Tamil Violin Cover)', artist: 'feat. M. Kowtham', thumbnail: video3Thumb, video: video3 },
    { id: 4, brand: 'CJ Germany', title: 'Jimikki Kammal (Violin Cover)', artist: 'feat. Princeten', thumbnail: video4Thumb, video: video4 },
    { id: 5, brand: 'CJ Germany', title: 'NENJINILE REBIRTH - THE VIOLIN', artist: 'feat. Chris G.', language: 'Official Violin Version', thumbnail: video5Thumb, video: video5 },
  ]

  const songs = [
    { id: 1, title: 'Vaa Vaathi', thumbnail: song1Thumb, audio: song1 },
    { id: 2, title: 'Mayilirage', thumbnail: song2Thumb, audio: song2 },
    { id: 3, title: 'Naani koni', thumbnail: song3Thumb, audio: song3 },
    { id: 4, title: 'Velicha Poove', thumbnail: song4Thumb, audio: song4 },
    { id: 5, title: 'Mannipaaya', thumbnail: song5Thumb, audio: song5 },
  ]

  const scrollVideos = (direction) => {
    const container = videosScrollRef.current
    if (container) {
      const scrollAmount = 400
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const scrollSongs = (direction) => {
    const container = songsScrollRef.current
    if (container) {
      const scrollAmount = 400
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="music-page">
      <div className="music-background" style={{ backgroundImage: `url(${musicBG})` }}></div>
      
      <div className="music-content">
        {/* VIDEOS Section */}
        <section className="videos-section">
          <div className="videos-header">
            <h2 className="section-title">VIDEOS</h2>
            <div className="scroll-controls">
              <button className="scroll-arrow" onClick={() => scrollVideos('left')} aria-label="Scroll left">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <button className="scroll-arrow" onClick={() => scrollVideos('right')} aria-label="Scroll right">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="scroll-container" ref={videosScrollRef}>
            <div className="items-row">
              {videos.map((video) => (
                <motion.div
                  key={video.id}
                  className="video-card"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => {
                    setSelectedVideo(video)
                    setIsVideoPlayerOpen(true)
                  }}
                >
                  <div className="thumbnail-container">
                    <img src={video.thumbnail} alt={video.title} className="thumbnail" />
                    <div className="play-overlay">
                      <div className="play-button">▶</div>
                    </div>
                  </div>
                  <div className="card-info">
                    {video.brand && <p className="card-brand">{video.brand}</p>}
                    <h3 className="card-title">{video.title}</h3>
                    {video.artist && <p className="card-artist">{video.artist}</p>}
                    {video.language && <p className="card-language">{video.language}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SONGS Section */}
        <section className="songs-section">
          <div className="songs-header">
            <h2 className="section-title">SONGS</h2>
            <div className="scroll-controls">
              <button className="scroll-arrow" onClick={() => scrollSongs('left')} aria-label="Scroll left">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <button className="scroll-arrow" onClick={() => scrollSongs('right')} aria-label="Scroll right">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="scroll-container" ref={songsScrollRef}>
            <div className="items-row">
              {songs.map((song) => (
                <motion.div
                  key={song.id}
                  className="song-card"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => {
                    setSelectedSong(song)
                    setIsAudioPlayerOpen(true)
                  }}
                >
                  <div className="thumbnail-container">
                    <img src={song.thumbnail} alt={song.title} className="thumbnail" />
                    <div className="play-overlay">
                      <div className="play-button">▶</div>
                    </div>
                  </div>
                  <div className="card-info">
                    <h3 className="card-title">{song.title}</h3>
                    {song.subtitle && <p className="card-subtitle">{song.subtitle}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="music-footer">
          <div className="footer-left">
            <span>MORE | SHOP</span>
          </div>
          <div className="footer-right">
            <span className="footer-copyright">© CJGERMANY ALL RIGHTS RESERVED | TERMS</span>
            <div className="footer-social">
            <a href="#" className="social-icon" aria-label="Spotify">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.66 0-.419.34-.78.78-.66 4.56.96 8.52 1.32 11.64 1.08.42 0 .72.36.66.78zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </a>
            <a href="#" className="social-icon" aria-label="YouTube">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="#" className="social-icon" aria-label="Apple Music">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </a>
            <a href="#" className="social-icon" aria-label="Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            </div>
          </div>
        </footer>
      </div>

      {/* Video Player Popup */}
      {isVideoPlayerOpen && (
        <VideoPlayer
          video={selectedVideo}
          isOpen={isVideoPlayerOpen}
          onClose={() => {
            setIsVideoPlayerOpen(false)
            setSelectedVideo(null)
          }}
        />
      )}

      {/* Audio Player Popup */}
      {isAudioPlayerOpen && (
        <AudioPlayer
          song={selectedSong}
          isOpen={isAudioPlayerOpen}
          onClose={() => {
            setIsAudioPlayerOpen(false)
            setSelectedSong(null)
          }}
        />
      )}
    </div>
  )
}

export default Music

