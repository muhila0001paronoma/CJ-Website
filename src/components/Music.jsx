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

