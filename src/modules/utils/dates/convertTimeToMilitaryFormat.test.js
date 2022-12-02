import convertTimeToMilitaryFormat from './convertTimeToMilitaryFormat';

describe('Convert to military format', () => {
  it('Convert number to military format', () => {
    expect(convertTimeToMilitaryFormat(150)).toEqual('02:30');
  });

  it('Convert 12 hour clock format to military format', () => {
    expect(convertTimeToMilitaryFormat('01:00 PM')).toEqual('13:00');
  });

  it('Military time is not converted', () => {
    expect(convertTimeToMilitaryFormat('13:00')).toEqual('13:00');
  });
});
