import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './processingScreen.css';

const ProcessingScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { flightId, bookingId,modeOfPayment, amount ,duration,SR,flight,formattedDate, dayOfWeek,sourceAirport,destinationAirport} = location.state;
  // const {amount,dayOfWeek,formattedDate, modeOfPayment,SR,flight,duration}=location.state;
  const [paymentInitiated, setPaymentInitiated] = useState(false); // State to track if payment status update is initiated
 
  useEffect(() => {
    const checkPaymentStatus = () => {
      const apiUrl = `http://localhost:8001/booking/search/${bookingId}`;
     
      fetch(apiUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === "successful") {
          navigate('/success', { state: { ticketDetails: data.ticketDetails,SR,flight,duration,formattedDate, dayOfWeek}});
        } else if (data.status === "failed") {
          navigate('/failed');
        } else if (!paymentInitiated) {
          // Only update status if not already Successful or Failed and payment hasn't been initiated
          updatePaymentStatus('successful');
        }
      })
      .catch(error => {
        console.error("Error checking payment status:", error);
        // Assuming error means the payment failed
        updatePaymentStatus('failed');
      });
    };

    const updateBookingStatus = async (status) => {
      try {
        // Replace this with your API call
        await fetch(`http://localhost:8001/booking/update/${bookingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status }),
        });
        console.log(`Booking status updated to ${status}`);
      } catch (error) {
        console.error(`Failed to update booking status to ${status}`, error);
      }
    };

    


    const updatePaymentStatus = (newStatus) => {
      setPaymentInitiated(true); // Set the payment initiated state to true

      const updateApiUrl = `http://localhost:8001/booking/payment`;
     
      fetch(updateApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId:bookingId,
          amount: amount,
          status: newStatus,
          modeOfPayment: modeOfPayment
        }),
      })
      .then(response => {
        if (response.status !== 200) {
          updateBookingStatus('failed');
        } 
      })
      .catch(error => {
        console.error("Error updating payment status:", error);
        updateBookingStatus('failed');
      });
    };

    // Call checkPaymentStatus immediately to initiate the process
    //checkPaymentStatus();

    // Call API every 5 seconds
    const intervalId = setInterval(checkPaymentStatus, 5000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [navigate, flightId, bookingId, modeOfPayment, SR,flight,amount ,duration, paymentInitiated,formattedDate, dayOfWeek,sourceAirport,destinationAirport]);

  return (
    <div className="processing-container">
      <p>Transaction is in process...</p>
      <div className="spinner"></div>

    </div>
  );
};

export default ProcessingScreen;
