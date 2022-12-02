import formatLocalDateTime from './formatLocalDateTime';
import MockDate from 'mockdate';

describe('Date utils', () => {
  describe('formatLocalDateTime', () => {
    describe('numeric date', () => {
      MockDate.set('09/20/2018 22:00:00');
      const date = new Date() / 1000;

      it('formats the given date', () => {
        expect(formatLocalDateTime(date)).toBe('9/20/2018 at 10:00 pm');
      });

      it('formats the given date with custom format', () => {
        expect(formatLocalDateTime(date, 'YYYY', 'h:mm', 'for')).toBe('2018 for 10:00');
      });
    });

    describe('string date', () => {
      MockDate.set('09/20/2018 22:00:00');
      const date = new Date().toString();

      it('formats the given date', () => {
        expect(formatLocalDateTime(date)).toBe('9/20/2018 at 10:00 pm');
      });

      it('formats the given date with custom format', () => {
        expect(formatLocalDateTime(date, 'YYYY', 'h:mm', 'for'))
          .toBe('2018 for 10:00');
      });
    });

    it('returns empty string if given a non-number', () => {
      expect(formatLocalDateTime('not-a-date')).toBe('');
      expect(formatLocalDateTime()).toBe('');
      expect(formatLocalDateTime(null)).toBe('');
    });
  });
});
