import React from 'react';
import PropTypes from 'prop-types';
import GuestName from './GuestName';

const Guest = props =>
  <li>
    <GuestName
      isEditing={props.isEditing}
      handleNameEdits={e => props.setName(e.target.value)}>
      {props.name}
    </GuestName>
    <label>
      <input
        type="checkbox"
        checked={props.isConfirmed}
        onChange={props.handleConfirmation} /> Confirmed
    </label>
    {/* buttn needs to say save when isEditing, else say edit.
      we could create a component and pass isEditing
      and have it return button that says right word depending
      on value of isEditing. OR
      could we just ..... TODO....
      */}
    <button onClick={props.handleToggleEditing}>edit</button>
    <button>remove</button>
  </li>

Guest.propTypes = {
  name: PropTypes.string.isRequired,
  isConfirmed: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  handleConfirmation: PropTypes.func.isRequired,
  handleToggleEditing: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired
}

export default Guest;
