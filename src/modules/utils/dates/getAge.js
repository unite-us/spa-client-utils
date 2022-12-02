import moment from 'moment';

function getAge(dateOfBirth) {
  const dob = moment.unix(dateOfBirth).utc();
  return moment().diff(dob, 'years');
}

export default getAge;
