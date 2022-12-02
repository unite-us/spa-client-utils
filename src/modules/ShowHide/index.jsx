import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const classes = hidden => classNames({
  'show-hide': true,
  hidden,
});

const ShowHide = ({ children, hide }) => (
  <div className={classes(hide)}>
    {children}
  </div>
);

ShowHide.propTypes = {
  /** Set to true to hide children, defaults to false */
  hide: PropTypes.bool,
  /** Content to conditionally show or hide */
  children: PropTypes.any.isRequired,
};

ShowHide.defaultProps = {
  hide: false,
};

export default ShowHide;
