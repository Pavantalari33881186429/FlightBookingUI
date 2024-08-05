// import React, { useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './processingScreen.css';

// const ProcessingScreen = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { flightId, bookingId, username, selectedPaymentMethod, price} = location.state;

//   useEffect(() => {
//     const checkPaymentStatus = () => {
//       // Replace with your API endpoint
//       const apiUrl = `http://localhost:8001/booking/search/${bookingId}`;
      
//       // Mock API call
//       fetch(apiUrl, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           flightId,
//           bookingId,
//           username,
//           modeOfPayment: selectedPaymentMethod,
//           amount: price,
//           status:'Successfull'
//         }),
//       })
//       .then(response => response.json())
//       .then(data => {
//         if (data.status === "successfull") {
//           navigate('/success', { state: { ticketDetails: data.ticketDetails } });
//         } else if (data.status === "failed") {
//           navigate('/failed');
//         }
//       })
//       .catch(error => {
//         console.error("Error checking payment status:", error);
//       });
//     };

//     // Call API every 5 seconds
//     const intervalId = setInterval(checkPaymentStatus, 5000);
//     const updatepaymentcall=(updatepaymentstatus);

//     return () => clearInterval(intervalId); // Cleanup interval on component unmount
//   }, [navigate, flightId, bookingId, username, selectedPaymentMethod, price]);

//   return (
//     <div className="processing-container">
//       <p>Transaction is in process...</p>
//        <div className="spinner"></div> 
//      </div>
//    );
// };

// export default ProcessingScreen;
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './processingScreen.css';

const ProcessingScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { flightId, bookingId, username, selectedPaymentMethod, price } = location.state;

  useEffect(() => {
    const checkPaymentStatus = () => {
      const apiUrl = `http://localhost:8001/booking/search/${bookingId}`;
      
      fetch(apiUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === "Successful") {
          navigate('/success', { state: { ticketDetails: data.ticketDetails } });
        } else if (data.status === "Failed") {
          navigate('/failed');
        } else {
          updatePaymentStatus('Successful');  // Assuming you want to update the status to 'successful' if it's neither successful nor failed
        }
      })
      .catch(error => {
        console.error("Error checking payment status:", error);
        updatePaymentStatus('Failed');  // If there's an error in checking status, update to 'failed'
      });
    };

    const updateBookingStatus = async () => {
      try {
        // Replace this with your API call
        await fetch(`http://localhost:8001/booking/update/${bookingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({status: 'Failed' }),
        });
        console.log('Booking status updated to Failed');
      } catch (error) {
        console.error('Failed to update booking status', error);
      }
    };

    const updatePaymentStatus = (newStatus) => {
      const updateApiUrl = `http://localhost:8001/booking/payment`;
      
      fetch(updateApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId:bookingId,
          amount:price,
          status: newStatus,
          modeOfPayment:selectedPaymentMethod
        }),
      })
      .then(response => {
        if (response.status != 200) {
          updateBookingStatus();
          
       
      }})
      .catch(error => {
        console.error("Error updating payment status:", error);
        
      });
    };

    const intervalId = setInterval(checkPaymentStatus, 5000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [navigate, flightId, bookingId, username, selectedPaymentMethod, price]);

  return (
    <div className="processing-container">
      <p>Transaction is in process...</p>
      <div className="spinner"></div> 
    </div>
  );
};

export default ProcessingScreen;
