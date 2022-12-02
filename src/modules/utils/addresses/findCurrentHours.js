import { formatDuration } from 'modules/hours/HoursOfOperation/utils';
import { DAYS_OF_THE_WEEK } from 'modules/hours/HoursOfOperation/constants';
import { get, map, orderBy, find } from 'lodash';

export default function findCurrentHours(provider) {
  const date = new Date();
  const today = DAYS_OF_THE_WEEK[date.getDay() - 1];
  let hoursDisplay = '';
  let todayHours = [];

  if (provider.hours_of_operation !== undefined) {
    todayHours = find(provider.hours_of_operation, { day_of_week: today }) || {};
    hoursDisplay = map(
      orderBy(todayHours.hours_of_operation, 'opens_at'),
      formatDuration,
    ).join(', ');
  } else {
    todayHours = get(provider, ['hours', today], []);
    hoursDisplay = map(
      todayHours,
      formatDuration,
    ).join(', ');
  }

  return {
    todayHours,
    hoursDisplay,
  };
}
