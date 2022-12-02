import React from 'react';
import PropTypes from 'prop-types';

const AllOrOne = (props) => {
  if (props.showAll) {
    return React.Children.toArray(props.children);
  }

  const renderedChildren = React.Children.toArray(props.children);
  return renderedChildren.length > 0 ? renderedChildren[0] : null;
};

AllOrOne.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]),
  showAll: PropTypes.bool,
};

AllOrOne.defaultProps = {
  showAll: false,
};

export default AllOrOne;
