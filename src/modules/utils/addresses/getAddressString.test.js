import group from 'testUtils/group.json';
import getAddressString from './getAddressString';

describe('getAddressString', () => {
  it('return an empty string if no valid address is passed in', () => {
    expect(getAddressString()).toEqual('');
  });

  it('return a formatted string of the address', () => {
    expect(getAddressString(group.addresses[0])).toEqual('10 Columbus Circle, New York, NY 10019');
    expect(getAddressString({ city: 'New York', state: 'NY' })).toEqual('New York, NY');
    expect(getAddressString({ postal_code: '10019', city: 'New York', state: 'NY' })).toEqual('New York, NY 10019');
  });
});
