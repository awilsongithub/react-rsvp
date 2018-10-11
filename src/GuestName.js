import React from 'react';
import PropTypes from 'prop-types';

// dependent on prop isEditing is either
// a span or an input
const GuestName = props => {
  if(props.isEditing){
    return (
      <input
        type='text'
        value={props.children}
        onChange={props.handleNameEdits}
      />
    );
  }

  return (
    <span>
      {props.children}
    </span>
  );
}


GuestName.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  handleNameEdits: PropTypes.func.isRequired
}

export default GuestName;
