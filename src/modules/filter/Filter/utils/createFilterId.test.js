import createFilterId from './createFilterId';

describe('createFilterId', () => {
  it('returns kebabCase id if a filter name is passed', () => {
    const filterName = 'Browse Geography';
    const expected = 'browse-geography-filter';

    expect(createFilterId(filterName)).toBe(expected);
  });

  it('returns "-filter" if filter name is not passed', () => {
    expect(createFilterId()).toEqual('-filter');
  });
});
