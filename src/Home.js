import React from 'react';
import './Home.css'; // Make sure to update the CSS import if you renamed App.css to Home.css
import SearchFlights from './searchFlights';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchResults from './searchResults';
import BookingScreen from './bookingScreen'

function Home() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<SearchFlights />} />
          <Route path="/flightlist" element={<SearchResults />} />
          <Route path="/bookingscreen" element={<BookingScreen />} />
        </Routes>
      </Router>
    );
  }

export default Home;
