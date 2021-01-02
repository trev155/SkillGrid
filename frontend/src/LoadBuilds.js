import React from 'react';
import PropTypes from 'prop-types';

const LoadBuilds = ({buttonAction}) => {
  return (
    <button className="loadBuildsButton" onClick={buttonAction}>Load Builds</button>
  );
}

LoadBuilds.propTypes = {
  buttonAction: PropTypes.func.isRequired
};

export default LoadBuilds;