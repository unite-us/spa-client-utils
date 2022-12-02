import group from 'testUtils/group.json';
import isInNetworkGroup from './isInNetworkGroup';

describe('isInNetworkGroup', () => {
  it('returns false if missing data', () => {
    expect(isInNetworkGroup()).toBeFalsy();
    expect(isInNetworkGroup({})).toBeFalsy();
  });
  it('returns false for OON groups', () => {
    const oonGroup = {
      group_type: 'out_of_network',
    };
    expect(isInNetworkGroup(oonGroup)).toBeFalsy();
  });
  it('returns true for in network groups', () => {
    const licensedGroup = {
      group_type: 'out_of_network',
      licensed: true,
    };
    expect(isInNetworkGroup(licensedGroup)).toBeTruthy();
    expect(isInNetworkGroup(group)).toBeTruthy();
  });
});
