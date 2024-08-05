
import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import './paymentScreen.css';
import card from './logos/card.PNG';

const PaymentScreen = () => {
  const { state } = useLocation();
  const { SR, price } = state || {};
  const navigate = useNavigate();

  // State to track the selected payment method
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Credit Card');
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (status) => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      if (status === 'cancel') {
        // Redirect to the Cancel screen
        navigate('/cancel', {
          state: {
            bookingId: SR.bookingId,
            
          },
        });
      } else if (status === 'Transaction is in progress') {
        // Navigate to the processing screen with the status as 'transaction in progress'
        navigate('/processing', {
          state: {
            flightId: SR.flightId,
            bookingId: SR.bookingId,
            username: SR.username,
            modeOfPayment: selectedPaymentMethod,
            amount: price,
            status: SR.status
          },
        });
      }
    }
  };
  

  const validateForm = () => {
    const errors = {};
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    if (cardNumber.length !== 16) {
      errors.cardNumber = "Card number must be 16 digits.";
    }

    if (!/^\d+$/.test(cardNumber)) {
      errors.cardNumber = "Card number must contain only digits.";
    }

    if (!cardHolder) {
      errors.cardHolder = "Card holder name is required.";
    }

    if (!expiryMonth || !expiryYear) {
      errors.expiryDate = "Expiry date is required.";
    } else if (
      parseInt(expiryYear) < currentYear ||
      (parseInt(expiryYear) === currentYear && parseInt(expiryMonth) < currentMonth)
    ) {
      errors.expiryDate = "Expiry date must be later than today.";
    }

    if (cvv.length !== 3 || !/^\d+$/.test(cvv)) {
      errors.cvv = "CVV must be a 3-digit number.";
    }

    return errors;
  };

  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => (currentYear + i).toString());

  return (
    <div className="payment-container">
      <div className="payment-methods">
        <ul>
          <li
            className={selectedPaymentMethod === 'Credit Card' ? 'active' : ''}
            onClick={() => setSelectedPaymentMethod('Credit Card')}
          >
            Credit Card
          </li>
          <li
            className={selectedPaymentMethod === 'Debit Card' ? 'active' : ''}
            onClick={() => setSelectedPaymentMethod('Debit Card')}
          >
            Debit Card
          </li>
          <li className="non-clickable">Saved Cards</li>
          <li className="non-clickable">UPI</li>
          <li className="non-clickable">Net Banking</li>
          <li className="non-clickable">Debit Card + ATM PIN / OTP</li>
          <li className="non-clickable">Wallets + Cash Cards</li>
          <li className="non-clickable">Bharat QR</li>
          <li className="non-clickable">PayLater by ICICI Bank</li>
        </ul>
      </div>

      <div className="payment-form">
        <form>
          <div className="card-image">
            <img src={card} alt="Bank Card" />
          </div>

          <div className="input-group">
            <label>Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="Card Number"
            />
            {errors.cardNumber && (
              <div className="error">{errors.cardNumber}</div>
            )}
          </div>

          <div className="input-group">
            <label>Name of Card Holder</label>
            <input
              type="text"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              placeholder="Name of Card Holder"
            />
            {errors.cardHolder && (
              <div className="error">{errors.cardHolder}</div>
            )}
          </div>

          <div className="input-group expiry-cvv">
            <div className="expiry">
              <label>Expiry Date</label>
              <div className="expiry-date">
                <select
                  value={expiryMonth}
                  onChange={(e) => setExpiryMonth(e.target.value)}
                >
                  <option value="">MM</option>
                  {months.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  value={expiryYear}
                  onChange={(e) => setExpiryYear(e.target.value)}
                >
                  <option value="">YYYY</option>
                  {years.map((year, index) => (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              {errors.expiryDate && (
                <div className="error">{errors.expiryDate}</div>
              )}
            </div>
            <div className="cvv">
              <label>CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="CVV"
              />
              <span className="info-icon">i</span>
              {errors.cvv && <div className="error">{errors.cvv}</div>}
            </div>
          </div>

          <div className="save-info">
            <input
              type="checkbox"
              checked={saveInfo}
              onChange={(e) => setSaveInfo(e.target.checked)}
            />
            <label>Save information for faster checkouts</label>
            <p>Note: Your CVV will not be saved</p>
          </div>
          
          <div>
            <button type="button" className="pay-button" onClick={() => handleSubmit('Transaction is in progress')}>
              <p>CONFIRM PAYMENT</p>
              <span className="price-view">₹{price}</span>
            </button>
          </div>

          <div>
            <button type="button" className="cancel-button" onClick={() => handleSubmit('cancel')}>
              <h3>CANCEL PAYMENT</h3>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;

