import React from 'react';
import ReactTooltip from 'react-tooltip';
import { Hexagon, Text } from 'react-hexgrid';

class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activated: false
    };
    this.activateAction = this.activateAction.bind(this);
  }

  activateAction(action) {
    this.setState({
      activated: !this.state.activated
    });
  }

  componentDidUpdate() {
    ReactTooltip.rebuild();
  }

  render() {
    const node = this.props.node;
    const updateSelectionData = this.props.updateSelectionData;
    const updateHoverData = this.props.updateHoverData;

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

    const activateAction = this.activateAction;
    const nodeIsActivated = this.state.activated;
    
    return (
      <Hexagon
        className={this.state.activated ? "activated" : ""}
        onClick={function() {
          activateAction();
          updateSelectionData({
            "position": node.positionQ + "/" + node.positionR,
            "displayText": displayText,
            "energy": node.energy,
            "moveLevel": node.moveLevel
          }, !nodeIsActivated);
        }}
        onMouseEnter={function() {
          updateHoverData(hoverData);
        }}
        q={parseInt(node.positionQ)} r={parseInt(node.positionR)} s={0}>
        <Text>{node.displayTextShort}</Text>
      </Hexagon>
    );
  }
}

export default Node;