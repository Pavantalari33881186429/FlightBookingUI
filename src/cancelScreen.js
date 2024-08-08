import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './cancelScreen.css';

const CancelScreen = () => {
  const { state } = useLocation();
  const { bookingId } = state || {};
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call to update the booking status to 'cancelled'
    const updateBookingStatus = async () => {
      try {
        // Replace this with your API call
        await fetch(`http://localhost:8001/booking/update/${bookingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({status: 'cancelled' }),
        });
        console.log('Booking status updated to cancelled');
      } catch (error) {
        console.error('Failed to update booking status', error);
      }
    };

    updateBookingStatus();
  }, [bookingId]);

  return (
    <div className="cancelled-container">
    <h1 className="cancelled-message">Your booking has been cancelled.</h1>
    <a href="/" className="home-link">Go to Home</a>
  </div>
  );
};

export default CancelScreen;
