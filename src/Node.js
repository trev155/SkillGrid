import React from 'react';
import { Hexagon, Text } from 'react-hexgrid';

const Node = ({node, clickFunction, hoverFunction}) => {
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
  
  return (
    <Hexagon
      className={node.activated ? "activated" : ""}
      onClick={function() {
        clickFunction(node);
      }}
      onMouseEnter={function() {
        hoverFunction(hoverData);
      }}
      q={parseInt(node.positionQ)} r={parseInt(node.positionR)} s={0}>
      <Text>{node.displayTextShort}</Text>
    </Hexagon>
  );
}

export default Node;