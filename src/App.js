import React from 'react';
import axios from 'axios';
import { HexGrid, Layout, Hexagon, Text } from 'react-hexgrid';
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
      gridData: []
    };
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
      const key = node.positionQ + "-" + node.positionR
      return (
        <Node key={key} node={node}/>
      );
    });

    return (
      <div className="skillGrid">
        <HexGrid width={800} height={800} viewBox="-110 -110 220 220">
          <Layout size={{ x: 10, y: 10 }} flat={true} spacing={1.1} origin={{ x: 0, y: 0 }}>
            {gridData}
          </Layout>
        </HexGrid>
      </div>
    );
  }
}

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

  render() {
    const node = this.props.node;
    return (
      <Hexagon q={node.positionQ} r={node.positionR}>
        <Text>{node.positionR}/{node.positionQ}</Text>
      </Hexagon>
    );
  }
}

export default App;
