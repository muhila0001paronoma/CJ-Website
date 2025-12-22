import React, { useState } from 'react'
import Navigation from './components/Navigation'
import Home from './components/Home'
import './App.css'

function App() {
  const [currentSection, setCurrentSection] = useState('home')

  return (
    <div className="app">
      <Navigation currentSection={currentSection} setCurrentSection={setCurrentSection} />
      {currentSection === 'home' && <Home />}
    </div>
  )
}

export default App

