import { formatTimeOfDay } from '../utils';

describe('formatTimeOfDay', () => {
  describe('formats integers', () => {
    it('formats time, 9AM', () => {
      expect(formatTimeOfDay(540)).toBe('9:00 AM');
    });

    it('formats time, noon', () => {
      expect(formatTimeOfDay(720)).toBe('12:00 PM');
    });

    it('formats time, 5PM', () => {
      expect(formatTimeOfDay(1020)).toBe('5:00 PM');
    });

    it('formats time, midnight', () => {
      expect(formatTimeOfDay(1439)).toBe('12:00 AM');
    });

    it('returns midnight when no value provided', () => {
      expect(formatTimeOfDay()).toBe('12:00 AM');
    });
  });

  describe('formats strings', () => {
    it('formats time, 9AM', () => {
      expect(formatTimeOfDay('09:00')).toBe('9:00 AM');
    });

    it('formats time, noon', () => {
      expect(formatTimeOfDay('12:00')).toBe('12:00 PM');
    });

    it('formats time, 5PM', () => {
      expect(formatTimeOfDay('05:00')).toBe('5:00 AM');
    });

    it('formats military time, 11:59 PM', () => {
      expect(formatTimeOfDay('23:59')).toBe('11:59 PM');
    });

    it('formats hours and minutes', () => {
      expect(formatTimeOfDay('17:45')).toBe('5:45 PM');
    });

    it('formats midnight', () => {
      expect(formatTimeOfDay('00:00')).toBe('12:00 AM');
    });
  });
});
