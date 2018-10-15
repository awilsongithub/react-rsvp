import React from 'react';
import PropTypes from 'prop-types';

class GuestName extends React.Component {

  render(){
    if(this.props.isEditing){
      return (
        <input
          type='text'
          value={this.props.children}
          onChange={this.props.handleNameEdits}
          className='guest-name-input'
          autoFocus
        />
      );
    }
    return (
      <span>
        {this.props.children}
      </span>
    );
  }

} // end GuestName

GuestName.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  handleNameEdits: PropTypes.func.isRequired
}

export default GuestName;
