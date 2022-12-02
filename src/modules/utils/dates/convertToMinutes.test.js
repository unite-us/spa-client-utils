import convertToMinutes from './convertToMinutes';

describe('Convert Military Hour to Minutes', () => {
  it('returns minutes', () => {
    expect(convertToMinutes('13:00')).toEqual(780);
    expect(convertToMinutes('01:00')).toEqual(60);
    expect(convertToMinutes('08:30')).toEqual(510);
    expect(convertToMinutes('')).toEqual(0);
  });
});
