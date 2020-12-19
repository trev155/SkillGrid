import React from 'react';

const Resetter = ({clickFunction}) => {
  return (
    <button className='resetButton' onClick={clickFunction}>Reset</button>
  );
}

export default Resetter;