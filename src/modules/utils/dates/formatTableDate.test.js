import moment from 'moment';
import formatTableDate from './formatTableDate';

function resetMoment() {
  moment.now = () => +new Date();
}

afterEach(() => {
  resetMoment();
});

describe('Date utils', () => {
  describe('formatTableDate', () => {
    describe('numeric date', () => {
      const date = 1537495200; // Friday, September 21, 2018 2:00:00 AM GMT

      it('formats the given date', () => {
        expect(formatTableDate(date)).toBe('9/21/2018');
      });

      it('formats the given date when the date is `0`', () => {
        expect(formatTableDate(0)).toBe('1/1/1970');
      });

      it('formats the given date as date, if today', () => {
        const sameDay = moment.unix(date).utc().valueOf();
        moment.now = () => sameDay;

        expect(formatTableDate(date)).toBe('Sep 21');
      });

      it('formats the given date within the scope of the current year', () => {
        const sameYear = moment({ year: 2018 }).valueOf();
        moment.now = () => sameYear;

        expect(formatTableDate(date)).toBe('Sep 21');
      });

      it('formats the given date with custom format', () => {
        expect(formatTableDate(date, 'YYYY')).toBe('2018');
      });
    });

    describe('string date', () => {
      const date = '2018-09-21T02:00:00-00:00'; // Friday, September 21, 2018 2:00:00 AM GMT

      it('formats the given date', () => {
        expect(formatTableDate(date)).toBe('9/21/2018');
      });

      it('formats the given date as date, if today', () => {
        const sameDay = moment(date);
        moment.now = () => sameDay;

        expect(formatTableDate(date)).toBe('Sep 21');
      });

      it('formats the given date within the scope of the current year', () => {
        const sameYear = moment({ year: 2018 }).valueOf();
        moment.now = () => sameYear;

        expect(formatTableDate(date)).toBe('Sep 21');
      });

      it('formats the given date with custom format', () => {
        expect(formatTableDate(date, 'YYYY')).toBe('2018');
      });
    });

    it('returns empty string if given a non-number', () => {
      expect(formatTableDate('not-a-date')).toBe('');
      expect(formatTableDate()).toBe('');
      expect(formatTableDate(null)).toBe('');
    });
  });
});
