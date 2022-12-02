import group from 'testUtils/group.json';
import getTelLink from './getTelLink';

describe('getTelLink', () => {
  it('returns a string in the format of a tel: Link', () => {
    expect(getTelLink(group.phone_numbers[0])).toEqual('tel:+12128922020');
  });

  it('returns a pound sign if no valid number is passed in', () => {
    expect(getTelLink()).toEqual('#');
  });
});
