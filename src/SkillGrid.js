import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HexGrid, Layout } from 'react-hexgrid';
import ReactTooltip from 'react-tooltip';
import Node from './Node';
import Selector from './Selector';
import Resetter from './Resetter';
import MoveLevel from './MoveLevel';
import SelectionPanel from './SelectionPanel';

function SkillGrid() {
  const [gridData, setGridData] = useState([]);
  const [hoverData, setHoverData] = useState("");
  const [unitNames, setUnitNames] = useState([]);
  const [unitSelection, setUnitSelection] = useState("");
  const [moveLevel, setMoveLevel] = useState(5);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  function loadInitialData() {
    axios.get("data/all_units.txt").then(result => {
      const unitNames = result.data.split("\n").splice(1).map(function(line) {
        return line.trim().split(",")[1];
      });
      setUnitNames(unitNames);
      switchUnit("Mew");
    });
  }

  function switchUnit(unitName) {
    setUnitSelection(unitName);
    setMoveLevel(5);
    getData(unitName);
  }

  function getData(unitName) {
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
      
      setGridData(gridData);
    });
  }

  function toggleSelectedNode(selectedNode) {
    if (moveLevel < selectedNode.moveLevel) {
      return;
    }

    const updatedGridData = gridData.map(function(node) {
      const newNode = node;
      if (selectedNode.positionQ === node.positionQ && selectedNode.positionR === node.positionR) {
        newNode.activated = !newNode.activated;
      }
      return newNode;
    });

    setGridData(updatedGridData);
  }

  function clearSelectedNodes() {
    const updatedGridData = gridData.map(function(node) {
      const newNode = node;
      newNode.activated = false;
      return newNode;
    });
    setGridData(updatedGridData);
  }

  // render variables
  const gridNodes = gridData.map(node => {
    const key = unitSelection + "-" + node.positionQ + "/" + node.positionR
    return (
      <Node key={key} node={node}
        clickFunction={toggleSelectedNode}
        hoverFunction={setHoverData} 
        moveLevel={moveLevel}
      />
    );
  });

  const options = unitNames.map(name => {
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
        <Selector selection={unitSelection} selectionChangeHandler={switchUnit} options={options}/>
        <Resetter clickFunction={clearSelectedNodes}/>
        <MoveLevel moveLevel={moveLevel} selectionChangeHandler={setMoveLevel}/>
      </div>

      <div className="columnMiddle">
        <HexGrid width={gridWidth} height={gridHeight} viewBox={viewBox}>
          <Layout size={{ x: 10, y: 10 }} flat={true} spacing={1.1} origin={{ x: 0, y: 0 }}>
            {gridNodes}
          </Layout>
        </HexGrid>  
      </div>

      <div className="columnRight">
        <SelectionPanel gridData={gridData}/>

        <svg data-tip="" data-for='dummyTooltip' width={0} height={0}/>
        <ReactTooltip id='dummyTooltip'/>
        <ReactTooltip id='skillTooltip'>{hoverData}</ReactTooltip>
      </div>
    </div>
  );
}

export default SkillGrid;