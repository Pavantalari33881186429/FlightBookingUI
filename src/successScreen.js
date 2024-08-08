import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import './successScreen.css';

const SuccessScreen = () => {
  const { state } = useLocation();
  const { flight, SR } = state || {};
  const [airportDetails, setAirportDetails] = useState(null);

  useEffect(() => {
    if (SR && SR.flightId) {
      const gettingairportdetails = async () => {
        try {
          // Replace this with your API call
          const response = await fetch(`http://localhost:8000/flights/search/${SR.flightId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log('Got details');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          setAirportDetails(result);
        } catch (error) {
          console.error(`Failed to get details ${SR.flightId}`, error);
        }
      };

      gettingairportdetails();
    }
  }, [SR]);

  if (!flight || !SR) {
    return <div>No ticket information available</div>;
  }

  const { startTime, reachTime, source, destination, price, flightName, flightNumber, travelDate } = flight;

  const handleDownloadTicket = () => {
    const ticketElement = document.querySelector('.boarding-pass');

    // Remove the download button before taking the snapshot
    const downloadButton = ticketElement.querySelector('.download-button');
    downloadButton.style.display = 'none';

    html2canvas(ticketElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('boarding_pass.pdf');

      // Restore the download button after the snapshot is taken
      downloadButton.style.display = 'block';
    });
  };

  return (
    <div className="boarding-pass" id="boarding-pass">
      <div className="header">
        <h1>BOARDING PASS</h1>
      </div>
      <div className="main-info">
        <div className="left-section">
          <div className="passenger-name">
            <strong>Passenger Name</strong>
            <p>{SR.userName.toUpperCase()}</p>
          </div>
          <div className="flight-route">
            <div className="from-to">
              <p><strong>From/To</strong></p>
              <div className="location">{source.toUpperCase()} &rarr; {destination.toUpperCase()}</div>
            </div>
          </div>
          <div className="flight-name">
            <strong>Flight Name</strong>
            <p>{flightName}</p>
          </div>
          <div className="flight-no">
            <strong>Flight No.</strong>
            <p>{flightNumber}</p>
            <p>{SR.flightId}</p>
          </div>
          <div className="flight-date">
            <strong>Flight Date</strong>
            <p>{travelDate}</p>
          </div>
          <div className="booking-ref">
            <strong>Booking Reference</strong>
            <p>{SR.bookingId}</p>
          </div>
          <div className="services">
            <strong>Services</strong>
            <p>Checked Baggage Allowance - up to 2 pieces, total 20 Kilos</p>
          </div>
        </div>
        <div className="right-section">
          <div className="flight-info">
            <div className="boarding-time">
              <strong>Boarding Time</strong>
              <p>{startTime}</p>
            </div>
            <div className="reach-time">
              <strong>Reach Time</strong>
              <p>{reachTime}</p>
            </div>
            <div className="seat">
              <strong>Seat</strong>
              <p>14C</p>
            </div>
            <div className="airport">
              <strong>Airport Code</strong>
              <p>{airportDetails?.sourceAirport || 'Loading...'}</p>
            </div>
            <div className="gate">
              <strong>Gate</strong>
              <p>Please check gate assignment at the airport.</p>
            </div>
            <div className="price">
              <strong>Price</strong>
              <p>${price}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="reminders">
        <h2>Here are some reminders before your flight!</h2>
        <div className="reminder-steps">
          <div className="step">
            <strong>Do you have baggage for check-in?</strong>
            <p>If checking in bags, go to our Online Check-In counters before {startTime} of {travelDate}.</p>
          </div>
          <div className="step">
            <strong>Security Check</strong>
            <p>Clear security.</p>
          </div>
          <div className="step">
            <strong>Proceed to the Boarding Gate</strong>
            <p>Be at the boarding gate 45 minutes before the scheduled departure, and wait for the boarding announcement.</p>
          </div>
          <div className="step">
            <strong>Board the Flight</strong>
            <p>Present your boarding pass, a valid ID, and board the flight.</p>
          </div>
        </div>
      </div>

      <button className="download-button" onClick={handleDownloadTicket}>Download Ticket</button>
    </div>
  );
};

export default SuccessScreen;





