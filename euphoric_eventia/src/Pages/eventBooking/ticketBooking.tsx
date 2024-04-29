import React, { useEffect, useState } from 'react';
import './TicketBooking.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Event} from '../../components/eventTypes.ts';

interface TicketBookingSectionProps {
  eventData: Event;
}

const TicketBookingSection: React.FC<TicketBookingSectionProps> = (props) => {
  const { eventData } = props;
  const dispatch = useDispatch();

  const [ticketCount, setTicketCount] = useState(1);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [taxRate, setTaxRate] = useState(0.18);
  const [taxAmount, setTaxAmount] = useState(0);
  const [localTotalAmount , setLocalTotalAmount] = useState(0);

  useEffect(() => {
    setTicketPrice(eventData.isEventFree ? 0 : parseFloat(eventData.eventCost));
    setTaxAmount(ticketPrice * taxRate * ticketCount);
    const newTotalAmount = ticketPrice * ticketCount + taxAmount;
    setLocalTotalAmount(newTotalAmount);

    console.log(localTotalAmount, "localTotalAmount");

    // Dispatch the action
    dispatch({ type: 'SET_TOTAL_AMOUNT', payload: localTotalAmount});
    
  }, [ticketCount, ticketPrice, taxRate, localTotalAmount , taxAmount, eventData, dispatch]);

  const incrementTickets = () => {
    setTicketCount((prevCount) => prevCount + 1);
  };

  const decrementTickets = () => {
    if (ticketCount > 1) {
      setTicketCount((prevCount) => prevCount - 1);
    }
  };

  const navigate = useNavigate();

  const handleCheckOut = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    navigate('/Checkout', { state: { eventData } });
  };

  return (
    <div className="booking-container">
      <h2 style={{ justifyContent: 'center', alignContent: 'center', textAlign: 'center' }}>{eventData.eventName}</h2>
      <h3 style={{ justifyContent: 'center', alignContent: 'center', textAlign: 'center' }}># of Tickets:</h3>
      <div className="ticket-controls">
        <button onClick={decrementTickets}>-</button>
        <input
          type="number"
          id="ticketCount"
          name="ticketCount"
          min="1"
          value={ticketCount}
          onChange={(e) => setTicketCount(parseInt(e.target.value))}
        />
        <button onClick={incrementTickets}>+</button>
      </div>

      <div className="order-summary">
        <h2 style={{ justifyContent: 'center', alignContent: 'center', textAlign: 'center' }}>Order Summary</h2>
        <div className="summary-row">
          <p>Ticket Price:</p>
          <p id="ticketPrice">{`$${ticketPrice.toFixed(2)}`}</p>
        </div>
        <div className="summary-row">
          <p>{`Tax(${(taxRate * 100).toFixed(0)}%)`}:</p>
          <p id="taxAmount">{`$${taxAmount.toFixed(2)}`}</p>
        </div>
        <div className="summary-row">
          <p>Total:</p>
          <p id="totalAmount">{`$${localTotalAmount.toFixed(2)}`}</p>
        </div>
      </div>

      <button className="checkout-button" onClick={handleCheckOut}>
        Check Out
      </button>
    </div>
  );
};

export default TicketBookingSection;
