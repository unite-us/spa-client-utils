import React from 'react';
import PropTypes from 'prop-types';

const ExpandableContent = ({ children, className, style }) => (
  <div
    className={className}
    style={style}
  >
    <div className="expandable-container__content-children">
      {children}
    </div>
  </div>
);

ExpandableContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
};

export default ExpandableContent;
