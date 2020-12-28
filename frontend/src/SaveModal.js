import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

const customStyles = {
	overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  content: {
    position: 'fixed',
   	width: '30%',
   	height: '25%',
   	top: '30%',
   	left: '30%',
   	bottom: '0%',
   	right: '0%',
    border: '3px solid #ccc',
    background: 'rgba(200, 200, 200, 0.8)',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px'
  }
};

function SaveModal({saveModalOpened, saveBuildAction, closeButtonAction}) {
  return (
    <ReactModal
    	appElement={document.getElementById("App")}
    	isOpen={saveModalOpened}
    	style={customStyles}
    	contentLabel={"Example Modal"}
    >  
			<button className="saveBuildClose" onClick={closeButtonAction}>X</button>
  		<h2 className="saveBuildTitle">Save Build</h2>
	    <input className="saveBuildName" type="text" placeholder="Build Name"/>
    	<button className="saveBuildButtonConfirm" onClick={saveBuildAction}>Save Build</button>
    </ReactModal>
  );
}

SaveModal.propTypes = {
  saveModalOpened: PropTypes.bool.isRequired,
  saveBuildAction: PropTypes.func.isRequired,
  closeButtonAction: PropTypes.func.isRequired
};

export default SaveModal;