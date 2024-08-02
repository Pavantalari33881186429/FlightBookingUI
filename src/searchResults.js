import React from 'react';
import { useLocation } from 'react-router-dom';
import './searchResults.css'; 
// import './Flig.css'; // Add your styles

const SearchResults= () => {
  const location = useLocation();
  const { flights } = location.state || { flights: [] };

  return (
    <div className="table-container">
      <table className="flight-table">
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Flight Name</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Travel Date</th>
            <th>Price</th>
            <th>StartTime</th>
            <th>ReachTime</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight, index) => (
            <tr key={index}>
              <td>{flight.flightNumber}</td>
              <td>{flight.flightName}</td>
              <td>{flight.source}</td>
              <td>{flight.destination}</td>
              <td>{flight.travelDate}</td>
              <td>{flight.price}</td>
              <td>{flight.startTime}</td>
              <td>{flight.reachTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
