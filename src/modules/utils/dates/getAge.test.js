import moment from 'moment';
import getAge from './getAge';
import MockDate from 'mockdate';
MockDate.set('05/05/2019 22:00:00');

describe('Date utils', () => {
  describe('getAge', () => {
    const dateOfBirth = moment()
      .subtract(19, 'year')
      .subtract(2, 'month')
      .unix();

    it('returns the appropriate age based on the date given', () => {
      expect(getAge(dateOfBirth)).toBe(19);
    });

    it('returns the appropriate age based on the date given when the given date is `0`', () => {
      expect(getAge(0)).toBe(49);
    });

    it('returns NaN if valid date is not given', () => {
      expect(getAge()).toEqual(NaN);
    });
  });
});
