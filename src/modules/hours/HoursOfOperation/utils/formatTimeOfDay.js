import {
  FAUX_MIDNIGHT,
  NOON,
} from '../constants';

function getRelativeTime(time) {
  if (time === FAUX_MIDNIGHT) {
    return 0;
  }
  return time < NOON ? time : time - NOON;
}

const formatMilitaryHours = time => (time > 12 ? time - 12 : time);

function formatTimeOfDay(time = 0) {
  let minute;
  let displayHour;
  let label;

  const timeVal = parseInt(time, 10);

  if (typeof time === 'number') {
    const relativeTime = getRelativeTime(timeVal);
    const hour = Math.floor(relativeTime / 60);
    minute = relativeTime - (hour * 60);
    displayHour = hour === 0 ? '12' : hour;
    label = timeVal < NOON || timeVal === FAUX_MIDNIGHT ? 'AM' : 'PM';
  }

  if (typeof time === 'string') {
    displayHour = timeVal === 0 ? 12 : formatMilitaryHours(timeVal);
    minute = timeVal ? parseInt(time.split(':')[1], 10) : 0;
    label = timeVal < 12 ? 'AM' : 'PM';
  }

  const displayMinute = minute < 10 ? `0${minute}` : minute;

  return `${displayHour}:${displayMinute} ${label}`;
}

export default formatTimeOfDay;
