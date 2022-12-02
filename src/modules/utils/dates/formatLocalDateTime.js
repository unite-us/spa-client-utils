import moment from 'moment';
import _ from 'lodash';

function formatLocalDateTime(date, dateFormat = 'M/D/YYYY', timeFormat = 'h:mm a', at = 'at') {
  let dateMoment;

  // use new Date(date) for moment deprecation warning
  // https://github.com/moment/moment/issues/1407

  const dateObj = new Date(date);
  const isValidDate = moment(dateObj).isValid();

  if (!isValidDate || _.isNil(date)) {
    return '';
  }

  if (_.isNumber(date)) {
    dateMoment = moment.unix(dateObj);
  }

  if (_.isString(date)) {
    dateMoment = moment(dateObj);
  }

  return dateMoment.format(`${dateFormat} [${at}] ${timeFormat}`);
}

export default formatLocalDateTime;
