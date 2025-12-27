import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import VideoSlider from './VideoSlider'
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
import home1 from '/home1.png'
import home2 from '/home2.png'
import home3 from '/home3.png'

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
    // Add smooth scroll class to html and body when on home page
    document.documentElement.classList.add('home-page-scroll')
    document.body.classList.add('home-page-scroll')
    
    return () => {
      // Remove class when component unmounts
      document.documentElement.classList.remove('home-page-scroll')
      document.body.classList.remove('home-page-scroll')
    }
  }, [])

  return (
    <div className="home-container">
      {/* Home Image Sections - Before Video */}
      <motion.section
        className="home-section"
        style={{ 
          backgroundImage: `url(${home3})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        initial={{ opacity: 0, scale: 1.1 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div className="section-content"></div>
      </motion.section>

      <motion.section
        className="home-section"
        style={{ 
          backgroundImage: `url(${home1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        initial={{ opacity: 0, scale: 1.1 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div className="section-content"></div>
      </motion.section>

      <motion.section
        className="home-section"
        style={{ 
          backgroundImage: `url(${home2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        initial={{ opacity: 0, scale: 1.1 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div className="section-content"></div>
      </motion.section>

      {/* Video Slider Section */}
      <VideoSlider />

      {sections.map((section, index) => {
        // Skip the first section (id: 1) as it's replaced by VideoSlider
        if (section.id === 1) return null
        
        return (
          <motion.section
            key={section.id}
            className="home-section"
            style={{ 
              backgroundImage: `url(${section.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className="section-content">
            {section.id === 2 && (
              <div className="moment-section">
                <motion.div 
                  className="moment-text-block"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <motion.div 
                    className="moment-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >A Moment</motion.span>
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >in</motion.span>
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                    >Bloom</motion.span>
                  </motion.div>
                  <motion.p 
                    className="moment-description"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    In the quiet pause between notes, a story unfolds—fragile, fleeting,
                    and achingly human. This is where the music remembers us.
                  </motion.p>
                </motion.div>

                <motion.div 
                  className="spotify-card"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div className="spotify-embed-wrapper">
                    <iframe
                      style={{ borderRadius: '0 0 18px 18px', border: 'none' }}
                      src="https://open.spotify.com/embed/playlist/37i9dQZF1EIXlOSE2lf0VA?utm_source=generator&theme=0"
                      width="100%"
                      height="380"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      title="CJ Germany Mix"
                    ></iframe>
                  </div>
                </motion.div>
              </div>
            )}

            {section.id === 3 && (
              <div className="bio-section">
                <motion.div 
                  className="bio-photo-wrapper"
                  initial={{ opacity: 0, x: -50, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <img
                    src={imgPortrait}
                    alt="CJ Germany playing violin"
                    className="bio-photo"
                  />
                </motion.div>

                <motion.div 
                  className="bio-text-card"
                  initial={{ opacity: 0, x: 50, y: 30 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <p className="bio-text">
                    Having stepped behind the microphone at the tender age of 12, CJ Germany&apos;s
                    journey has been anything but ordinary. Across countless stages and stories,
                    the violin has become his voice—fragile, fierce, and always honest.
                  </p>
                </motion.div>
              </div>
            )}

            {section.id === 4 && (
              <div className="nature-section">
                <motion.div 
                  className="nature-text-block"
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <p className="nature-text">
                    In the quiet embrace of nature, she finds her rhythm—where every petal whispers poetry and every page holds a promise. Dressed in simplicity, surrounded by color, she reads not just words, but the world around her. This is where music begins—not with sound, but with stillness.
                  </p>
                </motion.div>
              </div>
            )}

            {section.id === 6 && (
              <div className="tribe-section">
                <motion.div 
                  className="tribe-card"
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <motion.h2 
                    className="tribe-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >JOIN THE TREIBE</motion.h2>
                  <motion.p 
                    className="tribe-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    From my heart to yours, this is where we stay connected beyond the music.
                    A space for stories.
                  </motion.p>

                  <motion.form 
                    className="tribe-form"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
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
                  </motion.form>
                </motion.div>
              </div>
            )}
          </div>
        </motion.section>
        )
      })}
    </div>
  )
}

export default Home

