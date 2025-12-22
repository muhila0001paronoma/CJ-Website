import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import './Home.css'
import countries from '../data/countries.json'

// Import images directly
import img1 from '/Rectangle 1.png'
import img2 from '/Rectangle 2.png'
import img3 from '/Rectangle 3.png'
import img4 from '/Rectangle 4.png'
import img5 from '/Rectangle 5.png'
import img6 from '/Rectangle 30.png'
import imgPortrait from '/Rectangle 23.png'

const Home = () => {
  const sections = [
    { id: 1, image: img1 },
    { id: 2, image: img2 },
    { id: 3, image: img3 },
    { id: 4, image: img4 },
    { id: 5, image: img5 },
    { id: 6, image: img6 },
  ]

  useEffect(() => {
    // Add smooth scroll class to html when on home page
    document.documentElement.classList.add('home-page-scroll')
    
    return () => {
      // Remove class when component unmounts
      document.documentElement.classList.remove('home-page-scroll')
    }
  }, [])

  return (
    <div className="home-container">
      {sections.map((section, index) => (
        <motion.section
          key={section.id}
          className="home-section"
          style={{ 
            backgroundImage: `url(${section.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="section-content">
            {section.id === 2 && (
              <div className="moment-section">
                <div className="moment-text-block">
                  <div className="moment-title">
                    <span>A Moment</span>
                    <span>in</span>
                    <span>Bloom</span>
                  </div>
                  <p className="moment-description">
                    In the quiet pause between notes, a story unfolds—fragile, fleeting,
                    and achingly human. This is where the music remembers us.
                  </p>
                </div>

                <div className="spotify-card">
                  <div className="spotify-card-header">
                    <div className="spotify-profile">
                      <div className="spotify-avatar" />
                      <div>
                        <div className="spotify-artist">CJ Germany</div>
                        <div className="spotify-subtitle">Top tracks</div>
                        {/* 
                          To find CJ Germany's Spotify Artist ID:
                          1. Go to https://open.spotify.com and search for "CJ Germany"
                          2. Open the artist profile
                          3. Click "Share" → "Copy link to artist"
                          4. The link will be: https://open.spotify.com/artist/ARTIST_ID_HERE
                          5. Replace the ID below with the actual artist ID from the URL
                        */}
                        <a 
                          href="https://open.spotify.com/artist/REPLACE_WITH_ACTUAL_ARTIST_ID" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="spotify-follow"
                          style={{ textDecoration: 'none', display: 'inline-block' }}
                        >
                          Follow
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="spotify-embed-wrapper">
                    <iframe
                      style={{ borderRadius: '0 0 18px 18px', border: 'none' }}
                      src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0"
                      width="100%"
                      height="380"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      title="CJ Germany Playlist"
                    ></iframe>
                  </div>
                </div>
              </div>
            )}

            {section.id === 3 && (
              <div className="bio-section">
                <div className="bio-photo-wrapper">
                  <img
                    src={imgPortrait}
                    alt="CJ Germany playing violin"
                    className="bio-photo"
                  />
                </div>

                <div className="bio-text-card">
                  <p className="bio-text">
                    Having stepped behind the microphone at the tender age of 12, CJ Germany&apos;s
                    journey has been anything but ordinary. Across countless stages and stories,
                    the violin has become his voice—fragile, fierce, and always honest.
                  </p>
                </div>
              </div>
            )}

            {section.id === 4 && (
              <div className="nature-section">
                <div className="nature-text-block">
                  <p className="nature-text">
                    In the quiet embrace of nature, she finds her rhythm—where every petal whispers poetry and every page holds a promise. Dressed in simplicity, surrounded by color, she reads not just words, but the world around her. This is where music begins—not with sound, but with stillness.
                  </p>
                </div>
              </div>
            )}

            {section.id === 6 && (
              <div className="tribe-section">
                <div className="tribe-card">
                  <h2 className="tribe-title">JOIN THE TREIBE</h2>
                  <p className="tribe-subtitle">
                    From my heart to yours, this is where we stay connected beyond the music.
                    A space for stories.
                  </p>

                  <form className="tribe-form">
                    <label className="tribe-label">
                      Phone Number:
                      <div className="tribe-phone-wrapper">
                        <select className="tribe-flag-select" defaultValue="+91">
                          {countries.map((country) => (
                            <option key={country.code} value={country.dial_code}>
                              {country.flag ? `${country.flag} ${country.dial_code}` : country.dial_code}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          className="tribe-input tribe-phone-input"
                          placeholder="201-555-0123"
                        />
                      </div>
                    </label>

                    <label className="tribe-label">
                      E-Mail:
                      <input
                        type="email"
                        className="tribe-input"
                        placeholder="you@example.com"
                      />
                    </label>

                    <button type="submit" className="tribe-submit">
                      JOIN THE TRIBE
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </motion.section>
      ))}
    </div>
  )
}

export default Home

