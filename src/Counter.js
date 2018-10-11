import React from 'react';
import PropTypes from 'prop-types';

const Counter = props => {

  // TODO:
  // should I calculate these numbers here?
  // or in App.js?
  // maybe we want counter to be dumb and do as its told
  // because we want to retain at higher level, ability
  // to add logic like require confirmation AND payment
  // before saying they are attending...

  let attending = 0;
  let uncomfirmed = 0;
  let totalGs = 0;

  const calculateCounterData = () => {
    totalGs = props.guests.length;
    attending = props.guests.reduce(
      (total, guest) => guest.isConfirmed ? total + 1 : total,
      0
    );
    uncomfirmed = totalGs - attending;
  }
  calculateCounterData();

  return (
    <table className="counter">
      <tbody>
        <tr>
          <td>Attending:</td>
          <td>{attending}</td>
        </tr>
        <tr>
          <td>Unconfirmed:</td>
          <td>{uncomfirmed}</td>
        </tr>
        <tr>
          <td>Total:</td>
          <td>{totalGs}</td>
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
