import React from 'react';
import Guest from './Guest';
import PropTypes from 'prop-types';

// NOTE: this component keeps track of index of Guests
// individual guests have no idea that there even ARE other guests
// toggleConfirmation handler is defined here and thus will remember
// the value of index here
// so we create each Guest and give it a method that will pass the
// "id" of itself up. Its like a dogtag or a chip embedded in the handler method
// Guestlist is keeping track of the Guests so it is responsible for
// handling this

const GuestList = props =>
  <ul>
    {props.guests
      .filter(guest => !props.isFiltered || guest.isConfirmed)
      .map( (guest, index) =>
        <Guest
          key={index}
          name={guest.name}
          isConfirmed={guest.isConfirmed}
          isEditing={guest.isEditing}
          handleConfirmation={() => props.toggleConfirmationAt(index)}
          handleToggleEditing={() => props.toggleEditingAt(index)}
          setName={text => props.setName(text, index)}
        />
    )}
  </ul>

GuestList.propTypes = {
  guests: PropTypes.array.isRequired,
  toggleConfirmationAt: PropTypes.func.isRequired,
  toggleEditingAt: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  isFiltered: PropTypes.bool.isRequired
}

export default GuestList;
