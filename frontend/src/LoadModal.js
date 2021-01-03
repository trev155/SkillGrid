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
   	height: '50%',
   	top: '20%',
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

function LoadModal({closeButtonAction, loadModalOpen, builds, buildClickFunction}) {
  const buildsList = builds.map(function(build) {
    return <li key={build} onClick={function() { buildClickFunction(build) }}>{build}</li>
  });

  return (
    <ReactModal
    	appElement={document.getElementById("App")}
    	isOpen={loadModalOpen}
    	style={customStyles}
    >  
      <button className="loadBuildClose" onClick={closeButtonAction}>X</button>
      <h2 className="loadBuildTitle noselect">Load Build</h2>
      <ul className="loadBuildsList">{buildsList}</ul>
    </ReactModal>
  );
}

LoadModal.propTypes = {
  closeButtonAction: PropTypes.func.isRequired,
  loadModalOpen: PropTypes.bool.isRequired,
  builds: PropTypes.array.isRequired,
  buildClickFunction: PropTypes.func.isRequired
};

export default LoadModal;