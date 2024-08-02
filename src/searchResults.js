import React from 'react';
import { useLocation } from 'react-router-dom';
// import './FlightList.css'; // Add your styles

const SearchResults= () => {
  const location = useLocation();
  const { flights } = location.state || { flights: [] };

  return (
    <div className="flight-list">
      <h1 className="main-heading">Flight Results</h1>
      <div className="flight-container">
        {flights.length === 0 ? (
          <p>No flights found</p>
        ) : (
          <ul className="flight-results">
            {flights.map((flight, index) => (
              <li key={index}>
                <div className="flight-info">
                  <p><strong>Flight:</strong> {flight.name}</p>
                  <p><strong>Departure:</strong> {flight.departure}</p>
                  <p><strong>Arrival:</strong> {flight.arrival}</p>
                  <p><strong>Price:</strong> {flight.price}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchResults;





// const SearchResults = () => {
//   const { state } = useLocation();
//   const { source, destination, date} = state || {};
//   // const searchData = {
//   //   source,
//   //   destination,
//   //   date, // Make sure the date format is compatible with your backend
//   // };
//   return (
//         <div className="search-results">
//           <h2>Search Results</h2>
//           <p><strong>Source:</strong> {source}</p>
//           <p><strong>Destination:</strong> {destination}</p>
//           <p><strong>Date:</strong> {date}</p>
          
//         </div>
//       );

//   // Call the function to send data as query parameters
//   // sendSearchData(searchData);
// };

// export default SearchResults;
