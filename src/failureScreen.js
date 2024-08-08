import React from 'react';
import './failureScreen.css';
const FailureScreen = () => {
  return (
    <div className="failure-container">
    <h1 className="failure-message">Unfortunately, your payment could not be processed. Please try again.</h1>
    <a href="/" className="home-link">Go to Home</a>
  </div>
  );
};

export default FailureScreen;