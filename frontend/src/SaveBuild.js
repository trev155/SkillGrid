import React from 'react';
import PropTypes from 'prop-types';

const SaveBuild = ({saveButtonAction}) => {
  return (
    <button className="saveBuildButton" onClick={saveButtonAction}>Save Build</button>
  );
}

SaveBuild.propTypes = {
  saveButtonAction: PropTypes.func.isRequired
};

export default SaveBuild;