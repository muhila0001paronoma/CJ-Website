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
            {/* Content can be added here if needed */}
          </div>
        </motion.section>
      ))}
    </div>
  )
}

export default Home

