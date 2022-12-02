import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@unite-us/ui';
import classNames from 'classnames';

function InfoPanel({ className, message }) {
  return (
    <div className={classNames('info-panel', className)}>
      <Icon
        className="info-panel__icon"
        icon="IconExclamationCircle"
      />

      <p className="info-panel__text">
        {message}
      </p>
    </div>
  );
}

InfoPanel.propTypes = {
  /** Class name */
  className: PropTypes.string,
  /** Panel message text */
  message: PropTypes.string.isRequired,
};

InfoPanel.defaultProps = {
  className: '',
};

export default InfoPanel;
