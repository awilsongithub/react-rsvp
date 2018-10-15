import React from 'react';
import PropTypes from 'prop-types';

const GuestInputForm = props =>
  <form>
    <input
      type="text"
      value={props.pendingGuest}
      placeholder="Invite Someone"
      onChange={props.handleNameInput}
      id='invite-guest-input'
    />
    <button
      type="submit"
      name="submit"
      value="submit"
      onClick={props.newGuestSubmitHandler}
      >Submit
    </button>
  </form>

GuestInputForm.propTypes = {
  pendingGuest: PropTypes.string.isRequired,
  handleNameInput: PropTypes.func.isRequired,
  newGuestSubmitHandler: PropTypes.func.isRequired
}

export default GuestInputForm;
