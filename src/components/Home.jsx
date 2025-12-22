import React from 'react'
import { motion } from 'framer-motion'
import './Home.css'

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
                        <button className="spotify-follow">Follow</button>
                      </div>
                    </div>
                    <div className="spotify-header-actions">
                      <button className="spotify-prev-btn">&#9664;</button>
                      <button className="spotify-next-btn">&#9654;</button>
                      <button className="spotify-play-btn">&#9658;</button>
                    </div>
                  </div>

                  <div className="spotify-tracklist-wrapper">
                    <div className="spotify-scroll-arrow spotify-scroll-arrow-up">▲</div>
                    <div className="spotify-tracklist">
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <div key={num} className="spotify-track-row">
                          <div className="spotify-track-left">
                            <div className="spotify-track-index">{num}</div>
                            <div>
                              <div className="spotify-track-title">
                                Vaa Vaathi (Tamil Violin Cover)
                              </div>
                              <div className="spotify-track-meta">CJG | M. Kowtham</div>
                            </div>
                          </div>
                          <div className="spotify-track-duration">04:39</div>
                        </div>
                      ))}
                    </div>
                    <div className="spotify-scroll-arrow spotify-scroll-arrow-down">▼</div>
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
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+49">🇩🇪 +49</option>
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

