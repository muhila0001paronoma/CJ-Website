import React from 'react'
import './Events.css'

// Import background image
import eventsBG from '../assets/Events/events bg.png'

const Events = () => {
  const events = [
    { id: 1, country: 'INDIA', date: '12/13/2026', location: 'CHENAI' },
    { id: 2, country: 'USA', date: '19/13/2026', location: 'LA' },
    { id: 3, country: 'SRI LANKA', date: '12/13/2026', location: 'JAFFNA' },
    { id: 4, country: 'FRANCE', date: '12/13/2026', location: 'PARIS' },
    { id: 5, country: 'UK', date: '12/13/2026', location: 'Hyde Park' },
  ]

  const handleBookNow = (event) => {
    // Handle booking logic here
    console.log('Booking event:', event)
  }

  return (
    <div className="events-page">
      <div className="events-background" style={{ backgroundImage: `url(${eventsBG})` }}></div>
      
      <div className="events-content">
        <div className="events-overlay">
          <div className="events-table">
            <div className="events-header">
              <div className="header-cell">COUNTRY</div>
              <div className="header-cell">DATE</div>
              <div className="header-cell">LOCATION</div>
              <div className="header-cell"></div>
            </div>
            
            <div className="events-list">
              {events.map((event) => (
                <div key={event.id} className="event-row">
                  <div className="event-cell country">{event.country}</div>
                  <div className="event-cell date">{event.date}</div>
                  <div className="event-cell location">{event.location}</div>
                  <div className="event-cell button-cell">
                    <button 
                      className="book-now-button"
                      onClick={() => handleBookNow(event)}
                    >
                      BOOK NOW
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Events

