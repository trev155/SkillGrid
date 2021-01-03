import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HexGrid, Layout } from 'react-hexgrid';
import ReactTooltip from 'react-tooltip';
import Node from './Node';
import Selector from './Selector';
import Resetter from './Resetter';
import MoveLevel from './MoveLevel';
import SelectionPanel from './SelectionPanel';
import SaveBuild from './SaveBuild';
import SaveModal from './SaveModal';
import LoadBuilds from './LoadBuilds';
import LoadModal from './LoadModal';


function SkillGrid() {
  const [gridData, setGridData] = useState([]);
  const [hoverData, setHoverData] = useState("");
  const [unitNames, setUnitNames] = useState([]);
  const [unitSelection, setUnitSelection] = useState("");
  const [moveLevel, setMoveLevel] = useState(5);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [loadModalOpen, setLoadModalOpen] = useState(false);
  const [buildsList, setBuildsList] = useState([]);

  const defaultUnit = "Steelix";

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  useEffect(() => {
    loadBuilds();
  }, [loadModalOpen]);

  function loadInitialData() {
    axios.get("data/all_units.txt").then(result => {
      const unitNames = result.data.split("\n").splice(1).map(function(line) {
        return line.trim().split(",")[1];
      });
      setUnitNames(unitNames);
      switchUnit(defaultUnit);
    }).catch(function(err) {
      console.log("Could not fetch unit name data.");
      console.log(err.message);
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
        node.nodeType = parseInt(node.nodeType);
        return node;
      });

      setGridData(gridData);
    }).catch(function(err) {
      console.log("Could not fetch unit data.");
      console.log(err.message);
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

  function saveBuild(buildName) {
    if (buildName.length === 0) {
      return;
    }

    const requestOptions = {
      method: 'POST',
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(
        {"gridData": gridData, 
         "unitSelection": unitSelection, 
         "buildName": buildName,
         "moveLevel": moveLevel
        })
    };
    fetch('/grid', requestOptions)
      .then(result => result.text())
      .then(function(result) {
        setSaveModalOpen(false);
      });
  }

  function loadBuilds() {
    if (loadModalOpen) {
      const params = "?unit=" + unitSelection;
      fetch('/grid/all' + params).then(result => result.json()).then(result => setBuildsList(result));
    }
  }

  function loadBuild(buildName) {
    if (buildName.length === 0) {
      return;
    }
    const params = "?unit=" + unitSelection + "&build=" + buildName;
    fetch('/grid' + params)
    .then(result => result.json())
    .then(function(result) {
      setGridData(result);
      setLoadModalOpen(false);
    });
  }

  function deleteBuild(buildName) {
    if (buildName.length === 0) {
      return;
    }
    const params = "?unit=" + unitSelection + "&build=" + buildName;
    fetch('/grid' + params, {"method": "DELETE"})
      .then(result => result.text())
      .then(function(result) {
        console.log(result);
        setLoadModalOpen(false);
      });
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

  const gridWidth = "100%";
  const gridHeight = "100%";
  const viewBox = "-110 -110 220 220";
  
  return (
    <div className="skillGrid noselect">
      <div className="columnLeft">
        <div className="menuBar">
          <Selector selection={unitSelection} selectionChangeHandler={switchUnit} options={options}/>
          <Resetter clickFunction={clearSelectedNodes}/>
          <MoveLevel moveLevel={moveLevel} selectionChangeHandler={function(level) { 
            setMoveLevel(parseInt(level));
          }}/>
          <SaveBuild saveButtonAction={function() { setSaveModalOpen(true)}}/>
          <SaveModal 
            saveBuildAction={saveBuild} 
            closeButtonAction={function() { setSaveModalOpen(false)}} 
            saveModalOpened={saveModalOpen}
          />
          <LoadBuilds buttonAction={function() { setLoadModalOpen(true)}}/>
          <LoadModal 
            closeButtonAction={function() { setLoadModalOpen(false)}} 
            loadModalOpen={loadModalOpen}
            builds={buildsList}
            buildClickFunction={loadBuild}
            deleteBuildAction={deleteBuild}
          />
        </div>
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

        <ReactTooltip id='skillTooltip'>{hoverData}</ReactTooltip>
        <svg data-tip="" data-for='dummyTooltip' width={0} height={0}/>
        <ReactTooltip id='dummyTooltip'/>
      </div>
    </div>
  );
}

export default SkillGrid;