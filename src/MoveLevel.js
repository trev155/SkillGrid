import React from 'react';
import PropTypes from 'prop-types';

const MoveLevel = ({moveLevel, selectionChangeHandler}) => {
  return (
    <select className='moveLevelSelector' 
	  	onChange={function(e) {
        selectionChangeHandler(e.target.value)
      }} 
      value={moveLevel}>
      <option value='1'>1</option>
      <option value='2'>2</option>
      <option value='3'>3</option>
      <option value='4'>4</option>
      <option value='5'>5</option>
    </select>
  );
}

MoveLevel.propTypes = {
	moveLevel: PropTypes.number.isRequired,
	selectionChangeHandler: PropTypes.func.isRequired
};

export default MoveLevel;