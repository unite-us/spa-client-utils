import React from 'react';
import PropTypes from 'prop-types';
import { formatTimeOfDay } from './utils';
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

const getOpenHours = (day = '', hours) => {
  // Handle hours as both an array and an object.
  const openDay = Array.isArray(hours) ?
    hours.find(({ day_of_week } = {}) => (day === day_of_week)) :
    hours && hours[day];

  if (!openDay) {
    return undefined;
  }

  // Conform data to { opens: xxxx, closes: xxxx, ...}
  return 'hours_of_operation' in openDay ?
    openDay.hours_of_operation.map(({ closes_at, opens_at, ...properties } = {}) => ({
      ...properties,
      opens: opens_at,
      closes: closes_at,
    })) :
    openDay;
};

const formatHours = (hours = []) => (
  hours.map(v =>
    `${formatTimeOfDay(v.opens)} - ${formatTimeOfDay(v.closes)}`,
  ).join(',')
);

const HoursOfOperation = ({ hours, week }) => {
  const hoursComponent = week.map((day) => {
    const openHours = getOpenHours(day, hours);
    return (
      <div className="ui-hours-of-operation" key={day}>
        <div className="ui-hours-of-operation-day">
          <div className="ui-hours-of-operation-day__day-label">
            <p>{ABBREVIATED_DAYS[day] || day}</p>
          </div>
          <p className="ui-hours-of-operation-day__hours mb-half">
            {openHours ? formatHours(openHours) : CLOSED_DAY}
          </p>
        </div>
      </div>
    );
  });
  return hoursComponent;
};

HoursOfOperation.propTypes = {
  /** array of hours of operation values to display */
  hours: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  /** array of valid days of the week */
  week: PropTypes.array,
};

HoursOfOperation.defaultProps = {
  hours: [],
  week: DAYS_OF_THE_WEEK,
};

export default HoursOfOperation;
