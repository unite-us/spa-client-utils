import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ClearSelections = ({ onClick, allOptionsSelected }) => {
  const clearAllClass = () => classNames({
    'clear-all': true,
    'has-border': !allOptionsSelected,
  });

  return (
    <div className={clearAllClass()}>
      <a
        role="button"
        onClick={onClick}
        tabIndex={0}
      >
        Clear All
      </a>
    </div>
  );
};

ClearSelections.propTypes = {
  allOptionsSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ClearSelections;
