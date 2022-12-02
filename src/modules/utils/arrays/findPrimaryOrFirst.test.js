import group from 'testUtils/group.json';
import findPrimaryOrFirst from './findPrimaryOrFirst';

describe('findPrimaryOrFirst', () => {
  it('searches for an item in a collection that has a key of is_primary and the value true', () => {
    expect(findPrimaryOrFirst(group.phone_numbers).phone_number).toEqual('2128921010');
    expect(findPrimaryOrFirst(group.phone_numbers).is_primary).toBeTruthy();
  });

  it('returns the first item if no item has a key of is_primary', () => {
    expect(findPrimaryOrFirst(group.addresses).line_1).toEqual('10 Columbus Circle');
    expect(findPrimaryOrFirst(group.addresses).is_primary).toBeUndefined();
  });

  it('returns an empty object if nothing is passed in', () => {
    expect(findPrimaryOrFirst()).toEqual({});
  });
});
