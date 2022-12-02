import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import { slice, uniqueId } from 'lodash';
import { Icon } from '@unite-us/ui';
import { formatTimeOfDay } from 'modules/hours/HoursOfOperation/utils';
import AllOrOne from 'modules/AllOrOne';
import { DAYS_OF_THE_WEEK, CLOSED_DAY } from './constants';

const ABBREVIATED_DAYS = {
  monday: 'mon',
  tuesday: 'tue',
  wednesday: 'wed',
  thursday: 'thu',
  friday: 'fri',
  saturday: 'sat',
  sunday: 'sun',
};

const getHours = (dayOfWeek, hours = []) => {
  let openDay;

  if (Array.isArray(hours)) {
    openDay = hours.find(hd => dayOfWeek === hd.day_of_week);
  } else {
    openDay = hours[dayOfWeek];
  }

  const hoursOfOperation = openDay && openDay.hours_of_operation;
  let openClose = <div className="mb-half">{CLOSED_DAY}</div>;

  if (openDay !== undefined) {
    if (openDay.hours_of_operation) {
      openClose = hoursOfOperation.map(v =>
        <div className="mb-half" id={uniqueId(`${dayOfWeek}-hours-`)} key={uniqueId(dayOfWeek)}>{formatTimeOfDay(v.opens_at)} - {formatTimeOfDay(v.closes_at)}</div>);
    } else {
      openClose = openDay.map(v =>
        <div className="mb-half" id={uniqueId(`${dayOfWeek}-hours-`)} key={uniqueId(dayOfWeek)}>{formatTimeOfDay(v.opens)} - {formatTimeOfDay(v.closes)}</div>);
    }
  }

  return openClose;
};

const HoursOfOperationToday = ({ hours, showAll, showToggle }) => {
  const todayIndex = moment().day();
  const weekFromToday = [
    ...slice(DAYS_OF_THE_WEEK, todayIndex),
    ...slice(DAYS_OF_THE_WEEK, 0, todayIndex),
  ];

  const [showAllHours, setshowAllHours] = useState(false);

  if (!showAll && showAllHours) {
    setshowAllHours(showAll);
  }

  const hoursOfOperationClass = () => classNames({
    'ui-hours-of-operation-today': true,
    'ui-hours-of-operation-today--today-only': !showAll,
  });

  const hoursToggleClass = () =>
    classNames({
      'ui-hours-of-operation-day ml-quarter': true,
      'ml-half': showAll,
      'ui-hours-of-operation-day--link': showToggle && showAll,
    });


  return (
    <div className={hoursOfOperationClass()} data-test-element="hours-of-operation">
      <AllOrOne
        showAll={showToggle ? (showAll && showAllHours) : showAll}
      >
        {
          weekFromToday.map(dayOfWeek => (
            <div
              className={hoursToggleClass()}
              key={uniqueId(dayOfWeek)}
              onClick={() => setshowAllHours(!showAllHours)}
              role="button"
              tabIndex={0}
            >
              <div className="ui-hours-of-operation-day__day-label mr-half">
                <div id={uniqueId(dayOfWeek)}>{ABBREVIATED_DAYS[dayOfWeek] || dayOfWeek}</div>
              </div>

              <div className="ui-hours-of-operation-day__hours">
                {getHours(dayOfWeek, hours)}
              </div>

              {showToggle && showAll && DAYS_OF_THE_WEEK[todayIndex] === dayOfWeek &&
                <span className="ui-hours-of-operation-day__toggle ml-half">
                  <Icon
                    color="#4571BA"
                    icon={showAllHours ? 'IconCaretUp' : 'IconCaretDown'}
                  />
                </span>
              }
            </div>
          ))
        }
      </AllOrOne>
    </div>
  );
};

HoursOfOperationToday.propTypes = {
  /** array of hours of operation values to display */
  hours: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  /** should display all days or only the first one */
  showAll: PropTypes.bool,
  /** should display a separate caret to individually toggle hours */
  showToggle: PropTypes.bool,
};

HoursOfOperationToday.defaultProps = {
  hours: [],
  showAll: true,
  showToggle: false,
};

export default HoursOfOperationToday;
