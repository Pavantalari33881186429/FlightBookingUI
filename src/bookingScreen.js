// src/FlightCard.js
import React from 'react';
import './bookingScreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuitcaseRolling, faLuggageCart ,faPlane} from '@fortawesome/free-solid-svg-icons';



const bookingScreen = () => {
    
  
    return (
        <div className="flight-card">
            <div className="header">
                <div className="route">|Kolkata → Chennai</div>
            </div>
            <div className='durationanddate'>
            <div className="date">Thursday, Aug 15   |  Non Stop · 2h 30m</div>
            </div>
            <div className="airline">
                <FontAwesomeIcon icon={faPlane} style={{ color: 'Highlight' }}/>
                    <div className="flight-number">Air India AI 785</div>
                    <div className="aircraft"><button className="craft">Airbus A320 N</button></div>
                </div>
            <div className="flight-info">

            <div className="flight-times">
                    <div className="departure">
                        <div className="time-location">
                            <div className="time">17:00</div>
                            <div className="circle"></div>
                            <div className="location">Kolkata, Netaji Subhash Chandra Bose International Airport</div>
                        </div>
                      
                       <div className='vdld'>
                        <div className="vertical-dotted-line"><div className="duration">2h 30m</div></div>
                        </div>
                      
                        
                    </div>
                    <div className="arrival">
                        <div className="time-location">
                            <div className="time">19:30</div>
                            <div className="circle"></div>
                            <div className="location">Chennai, Chennai International Airport, Terminal T4</div>
                        </div>
                    </div>
                </div>
                <div className="baggage">
                <div className="cabin">
                        <FontAwesomeIcon icon={faSuitcaseRolling} style={{ color: 'brown' }}/> Cabin Baggage: 7 Kgs / Adult
                    </div>
                    <div className="check-in">
                        <FontAwesomeIcon icon={faLuggageCart} style={{ color: 'brown' }}/> Check-In Baggage: 15 Kgs / Adult
                    </div>
                </div>
            </div>
            <div className="footer">
                <button className="pay-button">PROCEED TO PAY</button>
                <div className="total-amount">Total Amount: ₹ 5,651</div>
            </div>
        </div>
    );
};

export default bookingScreen;
