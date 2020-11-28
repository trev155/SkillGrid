import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

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
    axios.get("data.json").then(result => {
      this.setState({"gridData": result.data});
    });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const gridData = this.state.gridData.map(node => {
      return (
        <Node key={node.position} node={node}/>
      );
    });

    return (
      <React.Fragment>
        {gridData}
      </React.Fragment>
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
    var node = this.props.node;
    return (
      <div>
        <button onClick={this.activateAction}>{this.state.activated ? "ON" : "OFF"} - {node.title}</button>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById("root"));
