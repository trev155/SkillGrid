import React from 'react';
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
    classes += "moveLevelGated";
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
      <Text>{node.displayTextShort}</Text>
    </Hexagon>
  );
}

export default Node;