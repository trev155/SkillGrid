import React from 'react';
import axios from 'axios';
import { HexGrid, Layout } from 'react-hexgrid';
import ReactTooltip from 'react-tooltip';
import Node from './Node';
import Selector from './Selector';
import Resetter from './Resetter';
import MoveLevel from './MoveLevel';
import SelectionPanel from './SelectionPanel';

class SkillGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // main data
      gridData: [],
      // tooltip data
      hoverData: "",
      // unit properties
      unitNames: [],
      unitSelection: "",
      moveLevel: 5
    };

    // nodes - click and hover
    this.toggleSelectedNode = this.toggleSelectedNode.bind(this);
    this.setHoverData = this.setHoverData.bind(this);
    // reset button
    this.clearSelectedNodes = this.clearSelectedNodes.bind(this);
    // selector
    this.switchUnit = this.switchUnit.bind(this);
    // move level
    this.switchMoveLevel = this.switchMoveLevel.bind(this);
  }

  componentDidMount() {
    this.loadInitialData();
  }

  componentDidUpdate() {
    ReactTooltip.rebuild();
  }

  loadInitialData() {
    axios.get("data/all_units.txt").then(result => {
      const unitNames = result.data.split("\n").splice(1).map(function(line) {
        return line.trim().split(",")[1];
      });
      this.setState({"unitNames": unitNames})
      this.switchUnit("Mew");
    });
  }

  switchUnit(unitName) {
    this.setState({
      "unitSelection": unitName,
      "moveLevel": 5
    })
    this.getData(unitName);
  }

  getData(unitName) {
    axios.get("data/" + unitName + ".json").then(result => {
      const gridData = result.data.map(function(jsonnode) {
        const node = jsonnode;
        node.activated = false;
        node.energy = parseInt(node.energy);
        node.moveLevel = parseInt(node.moveLevel);
        node.positionQ = parseInt(node.positionQ);
        node.positionR = parseInt(node.positionR);
        return node;
      });
      this.setState({"gridData": gridData});
    });
  }

  setHoverData(data) {
    this.setState({
      "hoverData": data
    });
  }

  toggleSelectedNode(selectedNode) {
    if (this.state.moveLevel < selectedNode.moveLevel) {
      return;
    }

    const updatedGridData = this.state.gridData.map(function(node) {
      const newNode = node;
      if (selectedNode.positionQ === node.positionQ && selectedNode.positionR === node.positionR) {
        newNode.activated = !newNode.activated;
      }
      return newNode;
    });

    this.setState({
      "gridData": updatedGridData
    }); 
  }

  clearSelectedNodes() {
    const updatedGridData = this.state.gridData.map(function(node) {
      const newNode = node;
      newNode.activated = false;
      return newNode;
    });

    this.setState({
      "gridData": updatedGridData
    });
  }

  switchMoveLevel(level) {
    this.setState({
      "moveLevel": level
    });
  }

  render() {
    const gridData = this.state.gridData.map(node => {
      const key = this.state.unitSelection + "-" + node.positionQ + "/" + node.positionR
      return (
        <Node key={key} node={node}
          clickFunction={this.toggleSelectedNode}
          hoverFunction={this.setHoverData} 
          moveLevel={this.state.moveLevel}
        />
      );
    });

    const options = this.state.unitNames.map(name => {
      return <option key={name} value={name}>{name}</option>;
    });

    // these should be determined by media queries
    const gridWidth = 900;
    const gridHeight = 900;
    const viewBoxMinX = -125;
    const viewBoxMinY = -125;
    const viewBoxWidth = 250;
    const viewBoxHeight = 250;
    const viewBox = viewBoxMinX + " " + viewBoxMinY + " " + viewBoxWidth + " " + viewBoxHeight;

    return (
      <div className="skillGrid">
        <div className="columnLeft">
          <Selector selection={this.state.unitSelection} selectionChangeHandler={this.switchUnit} options={options}/>
          <Resetter clickFunction={this.clearSelectedNodes}/>
          <MoveLevel moveLevel={this.state.moveLevel} selectionChangeHandler={this.switchMoveLevel}/>
        </div>

        <div className="columnMiddle">
          <HexGrid width={gridWidth} height={gridHeight} viewBox={viewBox}>
            <Layout size={{ x: 10, y: 10 }} flat={true} spacing={1.1} origin={{ x: 0, y: 0 }}>
              {gridData}
            </Layout>
          </HexGrid>  
        </div>

        <div className="columnRight">
          <SelectionPanel gridData={this.state.gridData}/>

          <svg data-tip="" data-for='dummyTooltip' width={0} height={0}/>
          <ReactTooltip id='dummyTooltip'/>
          <ReactTooltip id='skillTooltip'>{this.state.hoverData}</ReactTooltip>
        </div>
      </div>
    );
  }
}

export default SkillGrid;