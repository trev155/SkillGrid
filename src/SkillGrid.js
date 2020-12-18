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
      unitSelection: ""
    };
    this.setHoverData = this.setHoverData.bind(this);
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
      "unitSelection": unitName
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

  render() {
    const gridData = this.state.gridData.map(node => {
      const key = this.state.unitSelection + "-" + node.positionQ + "/" + node.positionR
      return (
        <Node key={key} node={node} setHoverData={this.setHoverData}/>
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
          <svg data-tip="" data-for='dummyTooltip' width={0} height={0}/>
          <ReactTooltip id='dummyTooltip'/>

          <ReactTooltip id='skillTooltip'>{this.state.hoverData}</ReactTooltip>
        </div>
      </div>
    );
  }
}

export default SkillGrid;