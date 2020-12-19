import React from 'react';

const SelectionPanel = ({gridData}) => {
	const selectedNodes = gridData.filter(function(node) {
		return node.activated;
	});
	const energyUsed = selectedNodes.reduce(function(accumulation, currentSelection) {
		return accumulation + parseInt(currentSelection.energy);
	}, 0);

	const selectionsMap = selectedNodes.reduce(function(accumulation, currentSelection) {
		const newAccumulation = accumulation;
		if (parseInt(currentSelection.moveLevel) === 1) {
			accumulation["level1"].push(currentSelection);
		} else if (parseInt(currentSelection.moveLevel) === 2) {
			accumulation["level2"].push(currentSelection);
		} else if (parseInt(currentSelection.moveLevel) === 3) {
			accumulation["level3"].push(currentSelection);
		}
		return newAccumulation;
	}, {"level1": [], "level2": [], "level3": []});

	const selectionAlphaSorter = function(selectionA, selectionB) {
		return selectionA.displayTextFull.localeCompare(selectionB.displayTextFull);
	}
	const levelOneSelections = selectionsMap["level1"].length === 0 ? "" : 
		<div className="levelOneSelections">
			<p>Level 1 Selections</p>
			<ul>
				{selectionsMap["level1"].sort(selectionAlphaSorter).map(function(selection) {
					return <li key={selection.positionQ + "/" + selection.positionR}>{selection.displayTextFull + " (" + selection.energy + ")"}</li>
				})}
			</ul>
		</div>
	const levelTwoSelections = selectionsMap["level2"].length === 0 ? "" : 
		<div className="levelTwoSelections">
			<p>Level 2 Selections</p>
			<ul>
				{selectionsMap["level2"].sort(selectionAlphaSorter).map(function(selection) {
					return <li key={selection.positionQ + "/" + selection.positionR}>{selection.displayTextFull + " (" + selection.energy + ")"}</li>
				})}
			</ul>
		</div>
	const levelThreeSelections = selectionsMap["level3"].length === 0 ? "" : 
		<div className="levelThreeSelections">
			<p>Level 3 Selections</p>
			<ul>
				{selectionsMap["level3"].sort(selectionAlphaSorter).map(function(selection) {
					return <li key={selection.positionQ + "/" + selection.positionR}>{selection.displayTextFull + " (" + selection.energy + ")"}</li>
				})}
			</ul>
		</div>

	return (
		<div className="selectionsPanel">
			<div className="energy">{"Energy Used: " + energyUsed}</div>
          	<div className="selectionsList">
          		{levelOneSelections}
          		{levelTwoSelections}
          		{levelThreeSelections}
          	</div>
		</div>
	);
}

export default SelectionPanel;