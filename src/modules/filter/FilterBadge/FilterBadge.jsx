import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Badge } from '@unite-us/ui';

const FilterBadge = ({ className, ...props }) => (
  <Badge
    className={classNames('filter-badge', className)}
    {...props}
  />
);

FilterBadge.propTypes = {
  /** Class name, in addition to `.filter-badge` */
  className: PropTypes.string,
  /** Badge background color, defaults to `white` */
  color: PropTypes.string,
  /** Badge shape, defaults to circle. */
  shape: PropTypes.string,
  /** Badge content, defaults to empty string */
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

FilterBadge.defaultProps = {
  className: '',
  color: 'white',
  shape: 'circle',
  text: '',
};

export default FilterBadge;
