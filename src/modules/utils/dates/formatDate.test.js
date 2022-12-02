import formatDate from './formatDate';

describe('Date utils', () => {
  describe('formatDate', () => {
    describe('numeric date', () => {
      const date = 1537495200; // Friday, September 21, 2018 2:00:00 AM GMT

      it('formats the given date when the date is `0`', () => {
        expect(formatDate(0)).toBe('1/1/1970');
      });

      it('formats the given date', () => {
        expect(formatDate(date)).toBe('9/21/2018');
      });

      it('formats the given date with custom format', () => {
        expect(formatDate(date, 'YYYY'))
          .toBe('2018');
      });
    });

    describe('string date', () => {
      const date = '2018-09-21T02:00:00-00:00'; // Friday, September 21, 2018 2:00:00 AM GMT

      it('formats the given date', () => {
        expect(formatDate(date)).toBe('9/21/2018');
      });

      it('formats the given date with custom format', () => {
        expect(formatDate(date, 'YYYY'))
          .toBe('2018');
      });
    });

    it('returns empty string if given a non-number', () => {
      expect(formatDate('not-a-date')).toBe('');
      expect(formatDate()).toBe('');
      expect(formatDate(null)).toBe('');
    });
  });
});
