
import React from 'react';
import './bookingScreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuitcaseRolling, faLuggageCart, faPlane } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';

const BookingScreen = () => {
  // Retrieve state from location
  const { state } = useLocation();
  const { flight,SR, travelerName, formattedDate, dayOfWeek ,logo} = state || {};
  const navigate = useNavigate();
  if (!flight) {
    return <div className="error">No flight details available</div>;
  }
  
  const { startTime, reachTime, source, destination, price, flightName, flightNumber,travelDate,sourceAirport,destinationAirport } = flight;
  const handlePaymentClick=async(SR,price,flight,formattedDate, dayOfWeek)=>{
    navigate('/paymentscreen', { 
        state: {  
          SR,
          travelerName,
          price,
          flight,formattedDate, dayOfWeek
          
        } 
      });
  }
  return (
    <div className="bsflight-card">
      <div className="bsheader">
        <div className="bsroute">{`${source} → ${destination}`}</div>
      </div>
      <div className='bsdurationanddate'>
      <div className="bsdate">{`${dayOfWeek}, ${formattedDate} - ${calculateDuration(startTime, reachTime)}`}</div>
      </div>
      <div className="bsairline">
        {/* <FontAwesomeIcon icon={faPlane} style={{ color: 'Highlight' }} /> */}
        <img src={logo} alt='NO IMAGE' className="bsflight-logo" />
        <div className="bsflight-number">{`${flightName} ${flightNumber}`}</div>
        <div className="bsaircraft"><button className="bscraft">Airbus A320 N</button></div>
      </div>
      <div className="bsflight-info">
        <div className="bsflight-times">
          <div className="bsdeparture">
            <div className="bstime-location">
              <div className="bstime">{startTime}</div>
              <div className="bscircle"></div>
              <div className="bslocation">{`${source} Airport`}</div>
            </div>
            <div className='bsvdld'>
              <div className="bsvertical-dotted-line">
                <div className="bsduration">{calculateDuration(startTime, reachTime)}</div>
              </div>
            </div>
          </div>
          <div className="bsarrival">
            <div className="bstime-location">
              <div className="bstime">{reachTime}</div>
              <div className="bscircle"></div>
              <div className="bslocation">{`${destination} Airport`}</div>
            </div>
          </div>
        </div>
        <div className="bsbaggage">
          <div className="bscabin">
            <FontAwesomeIcon icon={faSuitcaseRolling} style={{ color: 'brown' }} /> Cabin Baggage: 7 Kgs / Adult
          </div>
          <div className="bscheck-in">
            <FontAwesomeIcon icon={faLuggageCart} style={{ color: 'brown' }} /> Check-In Baggage: 15 Kgs / Adult
          </div>
        </div>
      </div>
      <div className="bsfooter">
        <button className="bspay-button"  onClick={() => handlePaymentClick(SR,price,flight,formattedDate, dayOfWeek)}>PROCEED TO PAY</button>
        <div className="bstotal-amount">{`Total Amount: ₹${price}`}</div>
      </div>
    </div>
  );
};

// Function to calculate the duration between two times
const calculateDuration = (startTime, reachTime) => {
  const start = new Date(`1970-01-01T${startTime}:00Z`);
  const reach = new Date(`1970-01-01T${reachTime}:00Z`);
  const durationInMs = reach - start;
  const hours = Math.floor(durationInMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationInMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

export default BookingScreen;