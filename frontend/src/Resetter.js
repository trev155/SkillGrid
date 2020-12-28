import React from 'react';
import PropTypes from 'prop-types';

const Resetter = ({clickFunction}) => {
  return (
    <button className='resetButton' onClick={clickFunction}>Reset</button>
  );
}

Resetter.propTypes = {
  clickFunction: PropTypes.func.isRequired
};

export default Resetter;