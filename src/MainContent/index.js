import React from 'react';
import PropTypes from 'prop-types';

import GuestList from './GuestList';
import ConfirmedFilter from './ConfirmedFilter';
import Counter from './Counter';

const MainContent = props =>

  <div className="main">
    <div>
      <h2>Invitees</h2>
      <ConfirmedFilter
        isFiltered={props.isFiltered}
        toggleFiltered={props.toggleFiltered}
      />
    </div>

    <Counter guests={props.guests} />

    <GuestList
      guests={props.guests}
      toggleEditingAt={props.toggleEditingAt}
      toggleConfirmationAt={props.toggleConfirmationAt}
      setName={props.setName}
      isFiltered={props.isFiltered}
      removeGuestAt={props.removeGuestAt}
      pendingGuest={props.pendingGuest}
    />

  </div>

MainContent.propTypes = {
  toggleConfirmationAt: PropTypes.func.isRequired,
  toggleEditingAt: PropTypes.func.isRequired,
  guests: PropTypes.array.isRequired,
  isFiltered: PropTypes.bool.isRequired,
  toggleFiltered: PropTypes.func.isRequired,
  removeGuestAt: PropTypes.func.isRequired,
  pendingGuest: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired
}

export default MainContent;
