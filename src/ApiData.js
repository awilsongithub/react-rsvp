import React from 'react';
import PropTypes from 'prop-types';

const ApiData = props => (
  <div>
    <h2>To Do List</h2>
    {props.data.map(item =>
      <div>
        <input
          type='checkbox'
          checked={item.completed}
          onChange={(event) => props.toggleCompleted(item, event)}
        />
        <span>{item.title}</span>
        <button
          onClick={(event) => props.deleteToDo(item, event)}>
          delete
        </button>
      </div>
    )}
  </div>
)

ApiData.propTypes = {
  data: PropTypes.array.isRequired,
  toggleCompleted: PropTypes.func.isRequired,
  deleteToDo: PropTypes.func.isRequired
}

export default ApiData;
