import React from 'react';
import PropTypes from 'prop-types';
import { Hexagon, Text } from 'react-hexgrid';

const Node = ({node, clickFunction, hoverFunction, moveLevel}) => {
  const displayText = decodeURIComponent(escape(node.displayTextFull));
  const energyText = "Energy: " + node.energy;
  const descriptionText = node.description.length > 0 ? <li>{decodeURIComponent(escape(node.description))}</li> : '';
  const hoverData = <div className='hoverData'>
    <ul>
      <li>{displayText}</li>
      <li>{energyText}</li>
      {descriptionText}
    </ul>
  </div>;
  
  let classes = "";
  if (node.activated) {
    classes += "activated ";
  }
  if (node.moveLevel > moveLevel) {
    classes += "moveLevelGated ";
  }
  if (node.nodeType === 1) {
    classes += "stat";
  } else if (node.nodeType === 2) {
    classes += "move";
  } else if (node.nodeType === 3) {
    classes += "moveEffect";
  } else if (node.nodeType === 4) {
    classes += "sync";
  } else if (node.nodeType === 5) {
    classes += "passive";
  }

  return (
    <Hexagon
      className={classes}
      onClick={function() {
        clickFunction(node);
      }}
      onMouseEnter={function() {
        hoverFunction(hoverData);
      }}
      q={node.positionQ} r={node.positionR} s={0}>
      <Text>
        <tspan>{node.displayTextShort}</tspan>
        <tspan className="nodeEnergy" x="0" dy="1.5em">({node.energy})</tspan>
      </Text>
    </Hexagon>
  );
}

Node.propTypes = {
  node: PropTypes.object,
  clickFunction: PropTypes.func,
  hoverFunction: PropTypes.func,
  moveLevel: PropTypes.number
};

export default Node;