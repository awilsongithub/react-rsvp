import React from 'react';
import PropTypes from 'prop-types';

const Counter = props => {

  // TODO:
  // should I calculate these numbers here?
  // or in App.js?
  // maybe we want counter to be dumb and do as its told
  // because we want to retain at higher level, ability
  // to add logic like require confirmation AND payment
  // before saying they are totalAttending...

  let totalAttending = 0;
  let totalUnconfirmed = 0;
  let totalGuests = 0;

  const calculateCounterData = () => {
    totalGuests = props.guests.length;
    totalAttending = props.guests.reduce(
      (total, guest) => guest.isConfirmed ? total + 1 : total,
      0
    );
    totalUnconfirmed = totalGuests - totalAttending;
  }
  calculateCounterData();

  return (
    <table className="counter">
      <tbody>
        <tr>
          <td>Attending:</td>
          <td>{totalAttending}</td>
        </tr>
        <tr>
          <td>Unconfirmed:</td>
          <td>{totalUnconfirmed}</td>
        </tr>
        <tr>
          <td>Total:</td>
          <td>{totalGuests}</td>
        </tr>
      </tbody>
    </table>
  )
}

Counter.propTypes = {
  totalAttending: PropTypes.number,
  numberUnconfirmed: PropTypes.number,
  totalInvited: PropTypes.number,
  guests: PropTypes.array
}

export default Counter;
