import group from 'testUtils/group.json';
import formatPhoneNumber from './formatPhoneNumber';

describe('formatPhoneNumber', () => {
  it('returns a formatted number', () => {
    expect(formatPhoneNumber(group.phone_numbers[0].phone_number)).toEqual('(212) 892-2020');
    expect(formatPhoneNumber('111222222')).toEqual('(---) 111-2222');
    expect(formatPhoneNumber('11122')).toEqual('');
  });
});
