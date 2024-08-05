import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const SearchFlights = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [formattedDate, setFormattedDate] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [filteredSourceOptions, setFilteredSourceOptions] = useState([]);
  const [filteredDestinationOptions, setFilteredDestinationOptions] = useState([]);

  const navigate = useNavigate();

  const locations = [
    { name: 'Ahmedabad', code: 'city' },
    { name: 'AMD', code: 'Sardar Vallabhbhai Patel International Airport' },
    { name: 'Amritsar', code: 'city' },
    { name: 'ATQ', code: 'Sri Guru Ram Dass Jee International Airport' },
    { name: 'Bangalore', code: 'city' },
    { name: 'BLR', code: 'Kempegowda International Airport' },
    { name: 'Bhubaneswar', code: 'city' },
    { name: 'BBI', code: 'Biju Patnaik International Airport' },
    { name: 'Chandigarh', code: 'city' },
    { name: 'IXC', code: 'Chandigarh International Airport' },
    { name: 'Chennai', code: 'city' },
    { name: 'MAA', code: 'Chennai International Airport' },
    { name: 'Cochin', code: 'city' },
    { name: 'COK', code: 'Cochin International Airport' },
    { name: 'Coimbatore', code: 'city' },
    { name: 'CJB', code: 'Coimbatore International Airport' },
    { name: 'Delhi', code: 'city' },
    { name: 'DEL', code: 'Indira Gandhi International Airport' },
    { name: 'Goa', code: 'city' },
    { name: 'GOI', code: 'Goa International Airport' },
    { name: 'Guwahati', code: 'city' },
    { name: 'GAU', code: 'Lokpriya Gopinath Bordoloi International Airport' },
    { name: 'Hyderabad', code: 'city' },
    { name: 'HYD', code: 'Rajiv Gandhi International Airport' },
    { name: 'Indore', code: 'city' },
    { name: 'IDR', code: 'Devi Ahilya Bai Holkar Airport' },
    { name: 'Jaipur', code: 'city' },
    { name: 'JAI', code: 'Jaipur International Airport' },
    { name: 'Kolkata', code: 'city' },
    { name: 'CCU', code: 'Netaji Subhas Chandra Bose International Airport' },
    { name: 'Lucknow', code: 'city' },
    { name: 'LKO', code: 'Chaudhary Charan Singh International Airport' },
    { name: 'Madurai', code: 'city' },
    { name: 'IXM', code: 'Madurai International Airport' },
    { name: 'Mangalore', code: 'city' },
    { name: 'IXE', code: 'Mangalore International Airport' },
    { name: 'Mumbai', code: 'city' },
    { name: 'BOM', code: 'Chhatrapati Shivaji Maharaj International Airport' },
    { name: 'Nagpur', code: 'city' },
    { name: 'NAG', code: 'Dr. Babasaheb Ambedkar International Airport' },
    { name: 'Patna', code: 'city' },
    { name: 'PAT', code: 'Jay Prakash Narayan International Airport' },
    { name: 'Pune', code: 'city' },
    { name: 'PNQ', code: 'Pune International Airport' },
    { name: 'Ranchi', code: 'city' },
    { name: 'IXR', code: 'Birsa Munda Airport' },
    { name: 'Srinagar', code: 'city' },
    { name: 'SXR', code: 'Sheikh ul-Alam International Airport' },
    { name: 'Surat', code: 'city' },
    { name: 'STV', code: 'Surat International Airport' },
    { name: 'Thiruvananthapuram', code: 'city' },
    { name: 'TRV', code: 'Trivandrum International Airport' },
    { name: 'Tiruchirapalli', code: 'city' },
    { name: 'TRZ', code: 'Tiruchirappalli International Airport' },
    { name: 'Tirupati', code: 'city' },
    { name: 'TIR', code: 'Tirupati International Airport' },
    { name: 'Udaipur', code: 'city' },
    { name: 'UDR', code: 'Maharana Pratap Airport' },
    { name: 'Varanasi', code: 'city' },
    { name: 'VNS', code: 'Lal Bahadur Shastri International Airport' },
    { name: 'Vishakhapatnam', code: 'city' },
    { name: 'VTZ', code: 'Visakhapatnam Airport' },
  ];

  const handleSwap = () => {
    const temp = source;
    setSource(destination);
    setDestination(temp);
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    setFormattedDate(selectedDate.toLocaleDateString('en-GB', options));
    const dayOptions = { weekday: 'long' };
    setDayOfWeek(selectedDate.toLocaleDateString('en-GB', dayOptions));
    setDate(e.target.value);
    setIsCalendarVisible(false);
  };

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const handleSourceChange = (e) => {
    const value = e.target.value;
    setSource(value);
    setFilteredSourceOptions(
      value ? locations.filter((location) =>
        location.name.toLowerCase().includes(value.toLowerCase()) ||
        location.code.toLowerCase().includes(value.toLowerCase())
      ) : []
    );
  };

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);
    setFilteredDestinationOptions(
      value ? locations.filter((location) =>
        location.name.toLowerCase().includes(value.toLowerCase()) ||
        location.code.toLowerCase().includes(value.toLowerCase())
      ) : []
    );
  };

  const handleSourceSelect = (location) => {
    setSource(location.name);
    setFilteredSourceOptions([]);
  };

  const handleDestinationSelect = (location) => {
    setDestination(location.name);
    setFilteredDestinationOptions([]);
  };



  const handleSearch = async () => {
    const apiUrl = `http://localhost:8001/booking/search?source=${source}&destination=${destination}&travelDate=${date}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      navigate('/flightlist', { 
        state: { 
          flights: result,
          formattedDate: formattedDate,
          dayOfWeek: dayOfWeek
        } 
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="search-flights">
      <h1 className="main-heading">FLIGHT BOOKING</h1>
      <div className="search-container">
        <div className="search-form">
          <div className="form-card">
            <div className="card-header">From</div>
            <div className="card-body">
              <input
                type="text"
                id="source"
                value={source}
                onChange={handleSourceChange}
                placeholder="Enter source"
              />
              {filteredSourceOptions.length > 0 && (
                <ul className="dropdown-list">
                  {filteredSourceOptions.map((location, index) => (
                    <li key={index} onClick={() => handleSourceSelect(location)}>
                      {location.name} ({location.code})
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="card-footer">
              {source && source !== destination && (
                <span>
                  {locations.find((loc) => loc.name === source)?.code || ''}
                </span>
              )}
            </div>
          </div>

          <div className="icon-container">
            <button onClick={handleSwap} className="swap-button">
              <i className="fas fa-exchange-alt"></i>
            </button>
          </div>

          <div className="form-card">
            <div className="card-header">To</div>
            <div className="card-body">
              <input
                type="text"
                id="destination"
                value={destination}
                onChange={handleDestinationChange}
                placeholder="Enter destination"
              />
              {filteredDestinationOptions.length > 0 && (
                <ul className="dropdown-list">
                  {filteredDestinationOptions.map((location, index) => (
                    <li key={index} onClick={() => handleDestinationSelect(location)}>
                      {location.name} ({location.code})
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="card-footer">
              {destination && destination !== source && (
                <span>
                  {locations.find((loc) => loc.name === destination)?.code || ''}
                </span>
              )}
            </div>
          </div>
          <div className="form-card">
            <div className="card-header">
              Departure
              <i 
                className="fas fa-caret-down date-icon" 
                onClick={toggleCalendar} // Toggle calendar visibility
              ></i>
            </div>
            <div className="card-body">
              {formattedDate && <p className="date-display">{formattedDate}</p>}
              {isCalendarVisible && ( // Conditionally render the calendar
                <input 
                  type="date" 
                  id="date" 
                  value={date} 
                  onChange={handleDateChange} 
                  className="date-picker"
                />
              )}
            </div>
            <div className="card-footer">
              <span>{dayOfWeek}</span>
            </div>
          </div>

          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};
export default SearchFlights;
