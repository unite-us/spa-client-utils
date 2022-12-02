import sortOptions from './sortOptions';

const bob = { value: 'bob', label: 'Bob Opedic', name: 'Bubs' };
const miles = { value: 'miles', label: 'Miles Opedic', name: 'Amilo' };
const other = { value: 'other', label: 'Other', name: 'Otro' };
const tyler = { value: 'tyler', label: 'Tyler Opedic', name: 'TyTy' };

describe('sortOptions', () => {
  const options = [miles, other, bob, tyler];
  it('sorts options by name key', () => {
    expect(
      sortOptions({
        options,
        sortKey: 'name',
      }),
    ).toEqual([miles, bob, other, tyler]);
  });

  it('sorts options by name key, descending', () => {
    expect(
      sortOptions({
        options,
        sortKey: 'name',
        sortDirection: 'desc',
      }),
    ).toEqual([tyler, other, bob, miles]);
  });

  it('sorts options and moves special "Other" option to the end', () => {
    expect(
      sortOptions({
        moveToEndValue: 'other',
        options,
      }),
    ).toEqual([bob, miles, tyler, other]);
  });
});
