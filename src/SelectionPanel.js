import React from 'react';

const SelectionPanel = ({energyUsed, selections}) => {
	const selectionsMap = selections.reduce(function(accumulation, currentSelection) {
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
		return selectionA.displayText.localeCompare(selectionB.displayText);
	}
	const levelOneSelections = selectionsMap["level1"].length === 0 ? "" : 
		<div className="levelOneSelections">
			<p>Level 1 Selections</p>
			<ul>
				{selectionsMap["level1"].sort(selectionAlphaSorter).map(function(selection) {
					return <li key={selection.position}>{selection.displayText + " (" + selection.energy + ")"}</li>
				})}
			</ul>
		</div>
	const levelTwoSelections = selectionsMap["level2"].length === 0 ? "" : 
		<div className="levelTwoSelections">
			<p>Level 2 Selections</p>
			<ul>
				{selectionsMap["level2"].sort(selectionAlphaSorter).map(function(selection) {
					return <li key={selection.position}>{selection.displayText + " (" + selection.energy + ")"}</li>
				})}
			</ul>
		</div>
	const levelThreeSelections = selectionsMap["level3"].length === 0 ? "" : 
		<div className="levelThreeSelections">
			<p>Level 3 Selections</p>
			<ul>
				{selectionsMap["level3"].sort(selectionAlphaSorter).map(function(selection) {
					return <li key={selection.position}>{selection.displayText + " (" + selection.energy + ")"}</li>
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