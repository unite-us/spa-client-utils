import { formatTimeOfDay } from 'modules/hours/HoursOfOperation/utils';

function convertTimeToMilitaryFormat(originalTime) {
  let time = originalTime;
  if (typeof time === 'number') { time = formatTimeOfDay(originalTime); }
  let hours = Number(time.match(/^(\d+)/)[1]);
  const minutes = Number(time.match(/:(\d+)/)[1]);
  let AP = time.match(/\s(.*)$/);
  if (!AP) AP = time.slice(-2);
  else AP = AP[1];
  if (AP === 'PM' && hours < 12) hours += 12;
  if (AP === 'AM' && hours === 12) hours -= 12;
  let Hours24 = hours.toString();
  let Minutes24 = minutes.toString();
  if (hours < 10) Hours24 = `0${Hours24}`;
  if (minutes < 10) Minutes24 = `0${Minutes24}`;

  return `${Hours24}:${Minutes24}`;
}

export default convertTimeToMilitaryFormat;
