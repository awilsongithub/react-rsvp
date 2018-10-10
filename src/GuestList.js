import React from 'react';
import Guest from './Guest';
import PropTypes from 'prop-types';

// NOTE: this component keeps track of index of Guests
// individual guests have no idea that there even ARE other guests
// toggleConfirmation handler is defined here and thus will remember
// the value of index here

const GuestList = props =>
  <ul>
    {props.guests.map( (guest, index) =>
      <Guest
        key={index}
        name={guest.name}
        isConfirmed={guest.isConfirmed}
        isEditing={guest.isEditing}
        handleConfirmation={() => props.toggleConfirmationAt(index)}
        handleToggleEditing={() => props.toggleEditingAt(index)}
      />
    )}
  </ul>

GuestList.propTypes = {
  guests: PropTypes.array.isRequired,
  toggleConfirmationAt: PropTypes.func.isRequired,
  toggleEditingAt: PropTypes.func.isRequired
}

export default GuestList;
