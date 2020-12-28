import React from 'react';
import PropTypes from 'prop-types';

const Selector = ({selection, selectionChangeHandler, options}) => {
  return (
    <select className='gridSelector' value={selection}
      onChange={function(e) {
        selectionChangeHandler(e.target.value)
      }}>
      {options}
    </select>
  );
}

Selector.propTypes = {
  selection: PropTypes.string.isRequired,
  selectionChangeHandler: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default Selector;