import React from 'react';
import axios from 'axios';
import { HexGrid, Layout } from 'react-hexgrid';
import ReactTooltip from 'react-tooltip';
import Selector from './Selector';
import Node from './Node';

class SkillGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // main data
      gridData: [],
      // tooltip data
      hoverData: "",
      // unit names and selector
      unitNames: [],
      unitSelection: "",
      // selections
      selections: [],
      energyUsed: 0
    };

    this.setHoverData = this.setHoverData.bind(this);
    this.updateSelectionData = this.updateSelectionData.bind(this);
    this.switchUnit = this.switchUnit.bind(this);
  }

  componentDidMount() {
    this.loadInitialData();
  }

  loadInitialData() {
    // load unit names
    axios.get("data/all_units.txt").then(result => {
      let unitNames = [];
      const unitData = result.data.split("\n");
      for (let i = 1; i < unitData.length; i++) {
        unitNames.push(unitData[i].trim().split(",")[1]);
      }
      this.setState({"unitNames": unitNames})

      // load default unit
      this.switchUnit("Mew");
    });
  }

  switchUnit(unitName) {
    this.setState({
      "unitSelection": unitName,
      "selections": [],
      "energyUsed": 0
    })
    this.getData(unitName);
  }

  getData(unitName) {
    axios.get("data/" + unitName + ".json").then(result => {
      this.setState({"gridData": result.data});
    });
  }

  setHoverData(data) {
    this.setState({
      "hoverData": data
    });
  }

  calculateSelectionEnergy() {
    let energyUsed = 0;
    for (let i = 0; i < this.state.selections.length; i++) {
      energyUsed += parseInt(this.state.selections[i].energy);
    }
    return energyUsed;
  }

  updateSelectionData(selection, isActivated) {
    let updatedSelections = [];
    if (isActivated) {
      updatedSelections = [...this.state.selections, selection];
    } else {
      for (let i = 0; i < this.state.selections.length; i++) {
        if (selection.position !== this.state.selections[i].position) {
          updatedSelections.push(this.state.selections[i]);
        }
      }
    }

    let energyUsed = 0;
    for (let i = 0; i < updatedSelections.length; i++) {
      energyUsed += parseInt(updatedSelections[i].energy);
    }
    
    this.setState({
     "selections": updatedSelections,
     "energyUsed": energyUsed
    });
  }

  render() {
    const gridData = this.state.gridData.map(node => {
      const key = this.state.unitSelection + "-" + node.positionQ + "/" + node.positionR
      return (
        <Node key={key} node={node} 
          setHoverData={this.setHoverData} 
          updateSelectionData={this.updateSelectionData}
        />
      );
    });

    const names = this.state.unitNames;
    const options = names.map(name => {
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
          <Selector selection={this.state.unitSelection} selectionChange={this.switchUnit} options={options}/>
        </div>

        <div className="columnMiddle">
          <HexGrid width={gridWidth} height={gridHeight} viewBox={viewBox}>
            <Layout size={{ x: 10, y: 10 }} flat={true} spacing={1.1} origin={{ x: 0, y: 0 }}>
              {gridData}
            </Layout>
          </HexGrid>  
        </div>

        <div className="columnRight">
          <div className="energy">{"Energy Used: " + this.state.energyUsed}</div>
          <div className="selectionsPanel"><ul>{this.state.selections.map(function(selection) {
            return <li key={selection.position}>{selection.displayText + " (" + selection.energy + ")"}</li>
          })}</ul></div>

          <svg data-tip="" data-for='dummyTooltip' width={0} height={0}/>
          <ReactTooltip id='dummyTooltip'/>
          <ReactTooltip id='skillTooltip'>{this.state.hoverData}</ReactTooltip>
        </div>
      </div>
    );
  }
}

export default SkillGrid;