import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <button className="footer-link">MORE</button>
          <span className="footer-separator">|</span>
          <button className="footer-link">SHOP</button>
        </div>

        <div className="footer-center">
          <span className="footer-copy">
            © CJGERMANY ALL RIGHTS RESERVED
          </span>
          <span className="footer-separator">|</span>
          <button className="footer-link">TERMS</button>
        </div>

        <div className="footer-right">
          {/* Social / music platform icons */}
          <a
            href="#"
            className="footer-icon"
            aria-label="Apple Music"
          >
            <img src="/apple-music-svgrepo-com.png" alt="Apple Music" />
          </a>
          <a
            href="#"
            className="footer-icon"
            aria-label="Instagram"
          >
            <img src="/instagram-167-svgrepo-com.png" alt="Instagram" />
          </a>
          <a
            href="#"
            className="footer-icon"
            aria-label="YouTube"
          >
            <img src="/youtube-168-svgrepo-com.png" alt="YouTube" />
          </a>
          <a
            href="#"
            className="footer-icon"
            aria-label="Spotify"
          >
            <img src="/spotify-svgrepo-com (1).png" alt="Spotify" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer


