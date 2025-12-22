import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './components/Home'
import Footer from './components/Footer'
import Music from './components/Music'
import Events from './components/Events'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/music" element={<Music />} />
          <Route path="/events" element={<Events />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App

