import React from 'react';
import PropTypes from 'prop-types';

const ConfirmedFilter = props =>
  <label>
    <input
      type="checkbox"
      checked={props.isFiltered}
      onChange={props.toggleFiltered}
    /> Hide those who haven't responded
  </label>

ConfirmedFilter.propTypes = {
  isFiltered: PropTypes.bool.isRequired,
  toggleFiltered: PropTypes.func.isRequired
}

export default ConfirmedFilter;
