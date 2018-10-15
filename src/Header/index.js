import React from 'react';
import PropTypes from 'prop-types';
import GuestInputForm from './GuestInputForm';

const Header = props =>
  <header>
    <h1>RSVP</h1>
    <p>A Treehouse App</p>
    <GuestInputForm
      pendingGuest={props.pendingGuest}
      handleNameInput={props.handleNameInput}
      newGuestSubmitHandler={props.newGuestSubmitHandler}
    />
  </header>

Header.propTypes = {
  pendingGuest: PropTypes.string.isRequired,
  handleNameInput: PropTypes.func.isRequired,
  newGuestSubmitHandler: PropTypes.func.isRequired
}

export default Header;
