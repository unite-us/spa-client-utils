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
  /** icon to the left of the label, defaults to IconShare */
  iconLeft: PropTypes.node,
  /** Required button id */
  id: PropTypes.string.isRequired,
  /** button label, defaults to "Share" */
  label: PropTypes.string,
};

ShareButton.defaultProps = {
  className: '',
  iconLeft: <Icon icon="IconMailForward" color="#4571BA" />,
  label: 'Share',
};

export default ShareButton;
