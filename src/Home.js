import React from 'react';
import './Home.css'; // Make sure to update the CSS import if you renamed App.css to Home.css
import SearchFlights from './searchFlights';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchResults from './searchResults';
import BookingScreen from './bookingScreen';
import PaymentScreen from './paymentScreen';
import ProcessingScreen from './processingScreen';
import SuccessScreen from './successScreen';
import FailureScreen from './failureScreen';
import CancelScreen from './cancelScreen';

function Home() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<SearchFlights />} />
          <Route path="/flightlist" element={<SearchResults />} />
          <Route path="/bookingscreen" element={<BookingScreen />} />
          <Route path="/paymentscreen" element={<PaymentScreen />} />
          <Route path="/processing" element={<ProcessingScreen />} />
        <Route path="/success" element={<SuccessScreen />} />
        <Route path="/failed" element={<FailureScreen />} />
        <Route path="/cancel" element={<CancelScreen />} />
        </Routes>
      </Router>
    );
  }

export default Home;
