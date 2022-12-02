import moment from 'moment';
import _ from 'lodash';

function formatTableDate(date, format) {
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

  const defaultFormat = format || 'M/D/YYYY';
  const sameYearFormat = 'MMM D';

  const utcDate = dateMoment.utc();

  if (format) {
    return utcDate.format(format);
  }

  const now = moment();

  if (moment(utcDate).isSame(now, 'year')) {
    return utcDate.format(sameYearFormat);
  }

  return utcDate.format(defaultFormat);
}

export default formatTableDate;
