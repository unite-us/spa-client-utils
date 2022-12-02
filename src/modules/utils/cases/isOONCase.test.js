import isOONCase from './isOONCase';

describe('isOONCase', () => {
  it('returns if the case program is out of network', () => {
    expect(isOONCase()).toBeFalsy();
    expect(isOONCase({ program: null })).toBeFalsy();
    expect(isOONCase({ program: { out_of_network: false } })).toBeFalsy();
    expect(isOONCase({ program: { out_of_network: true } })).toBeTruthy();
  });
});
