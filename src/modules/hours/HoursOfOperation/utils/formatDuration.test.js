import { formatDuration } from '../utils';

describe('formatDuration', () => {
  it('formats time in AM', () => {
    expect(formatDuration({ opens_at: 0, closes_at: 30 })).toBe('12:00 AM - 12:30 AM');
  });

  it('formats time from AM to PM', () => {
    expect(formatDuration({ opens_at: 30, closes_at: 1410 })).toBe('12:30 AM - 11:30 PM');
  });
});
