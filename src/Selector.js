import React from 'react';

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

export default Selector;