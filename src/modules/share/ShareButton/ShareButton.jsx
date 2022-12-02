import React from 'react';
import { PropTypes } from 'prop-types';
import { Button, Icon } from '@unite-us/ui';
import classNames from 'classnames';

const ShareButton = ({ className, ...props }) => (
  <Button
    className={classNames('share-button', className)}
    {...props}
  />
);

ShareButton.propTypes = {
  /** class name */
  className: PropTypes.string,
  /** icon to the right of the label, defaults to IconShare */
  iconRight: PropTypes.node,
  /** Required button id */
  id: PropTypes.string.isRequired,
  /** button label, defaults to "Share" */
  label: PropTypes.string,
};

ShareButton.defaultProps = {
  className: '',
  iconRight: <Icon icon="IconShare" color="#2C405A" />,
  label: 'Share',
};

export default ShareButton;
