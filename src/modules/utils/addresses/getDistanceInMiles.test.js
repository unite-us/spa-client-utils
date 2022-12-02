import getDistanceInMiles from './getDistanceInMiles';

const origin = [47.0721172, 15.3898987];
const dest = [47.0707727, 15.4208406];

describe('getDistanceInMiles', () => {
  it('returns nothing when missing params', () => {
    expect(getDistanceInMiles()).toBe('');
    expect(getDistanceInMiles(null, null)).toBe('');
    expect(getDistanceInMiles(null, null)).toBe('');
    expect(getDistanceInMiles(origin, null)).toBe('');
  });

  it('returns the distance', () => {
    expect(getDistanceInMiles(origin, dest)).toBe('1.46 mi');
  });

  it('returns the distance as a float', () => {
    expect(getDistanceInMiles(origin, dest, { format: 'float' })).toBe(1.4580235909380077);
  });
});
