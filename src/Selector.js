import React from 'react';

class Selector extends React.Component {
  render(props) {
    const selectionChangeFn = this.props.selectionChange;
    const options = this.props.options;

    return (
      <select className='gridSelector' value={this.props.selection} 
        onChange={function(e) {
          selectionChangeFn(e.target.value)
        }}>
        {options}
      </select>
    );
  }
}

export default Selector;