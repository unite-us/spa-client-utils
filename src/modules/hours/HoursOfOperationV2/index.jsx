import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Icon } from '@unite-us/ui';
import HoursOfOperationToday from 'modules/hours/HoursOfOperationToday';

const HoursOfOperationV2 = (props) => {
  const {
    className,
    showHoursIcon,
    hideLabel,
    hours,
    isInNetworkGroup,
    showAll,
    showToggle,
  } = props;

  if (!isEmpty(hours)) {
    return (
      <div className={`ui-hours-of-operation-v2 ${className}`}>
        { !showHoursIcon && <div className="ui-hours-of-operation-v2__spacer mr-half" />}
        <div className="ui-hours-of-operation-v2__title mr-quarter">
          { showHoursIcon &&
            <Icon
              className="ui-hours-of-operation-v2__title--icon mr-half"
              color={`${isInNetworkGroup ? '#4571BA' : '#2C405A'}`}
              icon="IconClock"
            />
          }

          { !hideLabel &&
            <span className="ui-hours-of-operation-v2__title--label pl-quarter">Hours today:</span>
          }
        </div>

        <HoursOfOperationToday
          hours={hours}
          showAll={showAll}
          showToggle={showToggle}
          isInNetworkGroup={isInNetworkGroup}
        />
      </div>
    );
  }

  return null;
};

HoursOfOperationV2.propTypes = {
  className: PropTypes.string,
  showHoursIcon: PropTypes.bool,
  hideLabel: PropTypes.bool,
  hours: PropTypes.object,
  isInNetworkGroup: PropTypes.bool,
  showAll: PropTypes.bool,
  showToggle: PropTypes.bool,
};

HoursOfOperationV2.defaultProps = {
  className: '',
  isInNetworkGroup: true,
  showHoursIcon: false,
  hideLabel: false,
  hours: {},
  showAll: false,
  showToggle: false,
};

export default HoursOfOperationV2;
