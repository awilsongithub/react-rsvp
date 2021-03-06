import React from 'react';
import PropTypes from 'prop-types';
import Guest from './Guest';
import PendingGuest from './PendingGuest';

const GuestList = props => (
  <ul>

    <PendingGuest
      name={props.pendingGuest}
    />

    {props.guests
      .filter(guest => !props.isFiltered || guest.isConfirmed)
      .map( (guest, index) =>
        <Guest
          key={guest.uid}
          name={guest.name}
          isConfirmed={guest.isConfirmed}
          isEditing={guest.isEditing}
          handleConfirmation={() => props.toggleConfirmationAt(guest.uid)}
          handleToggleEditing={() => props.toggleEditingAt(guest.uid)}
          removeGuestAt={() => props.removeGuestAt(guest.uid)}
          setName={text => props.setName(text, guest.uid)}
        />
    )}
  </ul>
)


GuestList.propTypes = {
  guests: PropTypes.array.isRequired,
  toggleConfirmationAt: PropTypes.func.isRequired,
  toggleEditingAt: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  isFiltered: PropTypes.bool.isRequired,
  removeGuestAt: PropTypes.func.isRequired,
  pendingGuest: PropTypes.string.isRequired
}

export default GuestList;
