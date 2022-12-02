import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@unite-us/ui';
import classNames from 'classnames';

export default function AddressCardText(props) {
  const { location, serviceAreaText, className, iconColor } = props;
  const icon = serviceAreaText ? 'IconRadar' : 'IconMapMarkV2';
  const title = serviceAreaText || location.displayName;
  const text = serviceAreaText || `${location.displayName} (${location.distance})`;

  return (
    <div
      className={classNames({
        'address-card-text': true,
        'detail-card-text': true,
      }, className)}
    >
      <div className="detail-card-text__location">
        <Icon
          className="detail-card-text__icon mr-half"
          color={iconColor}
          icon={icon}
        />
        <p title={title}>
          {text}
        </p>
      </div>
    </div>
  );
}

AddressCardText.propTypes = {
  /** className */
  className: PropTypes.string,
  /** location object via displayName and distance */
  location: PropTypes.object,
  /** icon color */
  iconColor: PropTypes.string,
  /** text describing the service area */
  serviceAreaText: PropTypes.string,
};

AddressCardText.defaultProps = {
  location: {},
  className: '',
  iconColor: '#67859E',
  serviceAreaText: null,
};
