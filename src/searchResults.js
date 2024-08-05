
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './searchResults.css'; 
import defaultLogo from './logos/default.PNG'; // Default image fallback

const imageContext = require.context('./logos', false, /\.(PNG|jpe?g|svg)$/i);

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flights } = location.state || { flights: [] };
  const [filters, setFilters] = useState({
    airline: '',
    morning: false,
    late: false,
    minPrice: '',
    maxPrice: ''
  });
  const [selectedFlight, setSelectedFlight] = useState(null);

  if (flights.length === 0) {
    return (
      <div className="no-flights-message">
        No flights available! Go back to search for other flights.
      </div>
    );
  }

  const calculateDuration = (startTime, reachTime) => {
    const start = new Date(`1970-01-01T${startTime}:00Z`);
    const reach = new Date(`1970-01-01T${reachTime}:00Z`);
    const durationInMs = reach - start;
    const hours = Math.floor(durationInMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationInMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const calculateDurationWidth = (startTime, reachTime) => {
    const start = new Date(`1970-01-01T${startTime}:00Z`);
    const reach = new Date(`1970-01-01T${reachTime}:00Z`);
    const durationInMs = reach - start;
    const hours = Math.floor(durationInMs / (1000 * 60 * 60));
    const maxDuration = 24; // Maximum duration for percentage calculation
    return `${(hours / maxDuration) * 100}%`; // Width as percentage
  };

  const handleFilterChange = (event) => {
    const { name, value, checked } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: name === 'morning' || name === 'late' ? checked : value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      airline: '',
      morning: false,
      late: false,
      minPrice: '',
      maxPrice: ''
    });
  };

  const appliedFilters = Object.entries(filters)
    .filter(([key, value]) => value !== '' && value !== false)
    .map(([key, value]) => {
      if (key === 'airline') return value;
      if (key === 'morning') return 'Morning Departures';
      if (key === 'late') return 'Late Departures';
      if (key === 'minPrice' || key === 'maxPrice') return `${key === 'minPrice' ? 'Min' : 'Max'} Price: ₹${value}`;
      return '';
    });

  const filteredFlights = flights.filter(flight => {
    const price = parseFloat(flight.price);
    const minPrice = parseFloat(filters.minPrice) || 0;
    const maxPrice = parseFloat(filters.maxPrice) || Infinity;
    return (!filters.airline || flight.flightName === filters.airline) &&
           (!filters.morning || flight.startTime <= "12:00") &&
           (!filters.late || flight.startTime >= "18:00") &&
           (price >= minPrice && price <= maxPrice);
  });

  const handleBookClick = (flight) => {
    setSelectedFlight(flight);
    const travelerName = window.prompt("Enter traveller name:");
    if (travelerName) {
      handleFormSubmit(travelerName, flight);
    }
  };

  const handleFormSubmit = async (travelerName, flight) => {
    try {
      // Hit the API with the flight and traveler details
      const response =await fetch('http://localhost:8001/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          flightId: flight.flightId,
          userName: travelerName,
          status: 'initiated'
        }),
      }
     
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();

      // Navigate to another page with flight data
      navigate('/bookingscreen', { 
        state: { 
          flight, 
          SR:result,
          travelerName, 
          formattedDate: location.state?.formattedDate,
          dayOfWeek: location.state?.dayOfWeek
        } 
      });

      alert(`Booking initiated for ${travelerName}!`);
    } catch (error) {
      console.error('Error updating flight status:', error);
    }
  };

  return (
    <div className="search-results-container">
      <div className="filters-section">
        <div className="applied-filters-header">
          <h3>Applied Filters</h3>
          <span className="clear-filters-link" onClick={clearFilters}>
            CLEAR ALL
          </span>
        </div>
        <div className="applied-filters-container">
          {appliedFilters.length > 0 ? (
            <ul>
              {appliedFilters.map((filter, index) => (
                <li key={index} className="applied-filter">{filter}</li>
              ))}
            </ul>
          ) : (
            <p>No filters applied</p>
          )}
        </div>

        <div className="filters-container">
          <h3>Filters</h3>
          <div>
            <input 
              type="checkbox" 
              name="morning" 
              checked={filters.morning} 
              onChange={handleFilterChange} 
            />
            <label>Morning Departures</label>
          </div>
          <div>
            <input 
              type="checkbox" 
              name="late" 
              checked={filters.late} 
              onChange={handleFilterChange} 
            />
            <label>Late Departures</label>
          </div>
          <div>
            <select name="airline" value={filters.airline} onChange={handleFilterChange}>
              <option value="">Airlines</option>
              <option value="IndiGo">IndiGo</option>
              <option value="SpiceJet">SpiceJet</option>
              <option value="Air India">Air India</option>
              <option value="GoAir">GoAir</option>
              <option value="Vistara">Vistara</option>
            </select>
          </div>
          <div>
            <label>Min Price</label>
            <input 
              type="number" 
              name="minPrice" 
              value={filters.minPrice} 
              onChange={handleFilterChange} 
              placeholder="0" 
            />
          </div>
          <div>
            <label>Max Price</label>
            <input 
              type="number" 
              name="maxPrice" 
              value={filters.maxPrice} 
              onChange={handleFilterChange} 
              placeholder="50000" 
            />
          </div>
        </div>
      </div>

      <div className="flights-container">
        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight, index) => {
            const imagePath = `./${flight.flightName || 'default'}.PNG`;
            let logo;
            try {
              logo = imageContext(imagePath);
            } catch (e) {
              logo = defaultLogo;
            }

            return (
              <div key={index} className="flight-card">
                <div className="flight-logo-section">
                  <img src={logo} alt={`${flight.flightName} Logo`} className="flight-logo" />
                  <div className="flight-details">
                    <span className="flight-name">{flight.flightName}</span>
                    <span className="flight-number">{flight.flightNumber}</span>
                  </div>
                </div>

                <div className="flight-time">
                  <div className="start-time">{flight.startTime}</div>
                  <div className="source-city">{flight.source}</div>
                </div>

                <div className="flight-duration">
                  <div className="duration-bar" style={{ width: calculateDurationWidth(flight.startTime, flight.reachTime) }}></div>
                  <span>{calculateDuration(flight.startTime, flight.reachTime)}</span>
                </div>

                <div className="flight-time">
                  <div className="reach-time">{flight.reachTime}</div>
                  <div className="destination-city">{flight.destination}</div>
                </div>

                <div className="flight-price">
                  <span>₹{flight.price}</span>
                  <div className="prp">per adult</div>
                </div>

                <button className="book-button" onClick={() => handleBookClick(flight)}>Book</button>
              </div>
            );
          })
        ) : (
          <div className="no-flights-message">No Flights available matching your criteria</div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
