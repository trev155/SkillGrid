import React from 'react';
import axios from 'axios';
import { HexGrid, Layout, Hexagon, Text } from 'react-hexgrid';
import ReactTooltip from 'react-tooltip'
import './App.css';

function App() {
  return (
    <div className="App">
      <SkillGrid/>
    </div>
  );
}

class SkillGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gridData: [],
      hoverData: ""
    };
    this.setHoverData = this.setHoverData.bind(this);
  }

  setHoverData(data) {
    this.setState({
      "hoverData": data
    });
  }

  getData() {
    axios.get("data/sceptile.json").then(result => {
      this.setState({"gridData": result.data});
    });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const gridData = this.state.gridData.map(node => {
      const key = node.positionQ + "/" + node.positionR
      return (
        <Node key={key} node={node} setHoverData={this.setHoverData}/>
      );
    });

    return (
      <div className="skillGrid">
        <HexGrid width={800} height={800} viewBox="-150 -110 220 220">
          <Layout size={{ x: 10, y: 10 }} flat={true} spacing={1.1} origin={{ x: 0, y: 0 }}>
            {gridData}
          </Layout>
        </HexGrid>

        <svg data-tip="test" data-for='dummyTooltip'/>
        <ReactTooltip id='dummyTooltip'/>

        <ReactTooltip id='skillTooltip'>{this.state.hoverData}</ReactTooltip>
      </div>
    );
  }
}

class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activated: false,
      hovering: false,

    };
    this.activateAction = this.activateAction.bind(this);
    this.hoverToggle = this.hoverToggle.bind(this);
  }

  activateAction(action) {
    this.setState({
      activated: !this.state.activated
    });
  }

  hoverToggle(action) {
    this.setState({
      hovering: !this.state.hovering
    });
  }

  componentDidUpdate() {
    ReactTooltip.rebuild()
  }

  render() {
    const node = this.props.node;

    const hoverDescription = node.description.length > 0 ? <li>{node.description}</li> : '';
    const hoverData = <ul><li>{node.displayTextFull}</li><li>Energy: {node.energy}</li>{hoverDescription}</ul>;

    const updateHoverData = this.props.setHoverData;

    return (
      <Hexagon 
        className={this.state.activated ? "activated" : ""}
        onClick={this.activateAction}
        onMouseEnter={function() {
          updateHoverData(hoverData);
        }}
        onMouseLeave={this.hoverToggle}
        q={parseInt(node.positionQ)} r={parseInt(node.positionR)} s={0}>
        <Text>{node.displayTextShort}</Text>
      </Hexagon>
    );
  }
}

export default App;
