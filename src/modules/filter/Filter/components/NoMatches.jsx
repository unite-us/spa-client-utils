import React from 'react';
import PropTypes from 'prop-types';

const NoMatches = ({ noMatchesFound, placeholder }) => {
  if (noMatchesFound) {
    return (
      <div className="no-matches">
        <span>{placeholder}</span>
      </div>
    );
  }

  return null;
};

NoMatches.propTypes = {
  noMatchesFound: PropTypes.bool.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default NoMatches;
