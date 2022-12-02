import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ShareDrawerListItem = ({ children, className }) => (
  <li className={classNames('share-drawer-list-item', className)}>
    {children}
  </li>
);

ShareDrawerListItem.propTypes = {
  /** class name */
  className: PropTypes.string,
  /** list item content */
  children: PropTypes.node.isRequired,
};

ShareDrawerListItem.defaultProps = {
  className: '',
};

export default ShareDrawerListItem;
