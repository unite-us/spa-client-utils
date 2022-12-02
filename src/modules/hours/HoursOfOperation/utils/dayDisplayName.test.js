import { dayDisplayName } from '../utils';

describe('dayDisplayName', () => {
  it('returns abbreviated day', () => {
    expect(dayDisplayName('monday')).toBe('mon');
    expect(dayDisplayName('tuesday')).toBe('tue');
    expect(dayDisplayName('wednesday')).toBe('wed');
    expect(dayDisplayName('thursday')).toBe('thu');
    expect(dayDisplayName('friday')).toBe('fri');
    expect(dayDisplayName('saturday')).toBe('sat');
    expect(dayDisplayName('sunday')).toBe('sun');
  });

  it('returns full day value by default', () => {
    expect(dayDisplayName('fluday')).toBe('fluday');
  });
});
