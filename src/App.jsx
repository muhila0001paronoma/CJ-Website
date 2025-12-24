import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './components/Home'
import Music from './components/Music'
import Events from './components/Events'
import AudioPlayerPage from './components/AudioPlayerPage'
import './App.css'

function AppLayout() {
  const location = useLocation()
  const hideNav = location.pathname === '/music/player'

  return (
    <div className="app">
        {!hideNav && <Navigation />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/music" element={<Music />} />
          <Route path="/music/player" element={<AudioPlayerPage />} />
          <Route path="/events" element={<Events />} />
        </Routes>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  )
}

export default App

