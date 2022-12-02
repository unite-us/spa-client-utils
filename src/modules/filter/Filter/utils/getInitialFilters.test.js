import getInitialFilters from './getInitialFilters';

describe('getInitialFilters', () => {
  it('returns options that have already been selected', () => {
    const options = [{
      label: 'opt 1',
      value: 'opt1',
      initial: true,
    },
    {
      label: 'opt 2',
      value: 'opt2',
      children: [{
        label: 'opt 2 1',
        value: 'opt21',
        initial: true,
      }],
    },
    {
      label: 'opt 3',
      value: 'opt3',
    }];

    const expected = ['opt1', 'opt21'];

    expect(getInitialFilters(options)).toEqual(expected);
  });

  it('returns false if options have no children', () => {
    const withChildren = [{
      label: 'opt 1',
      value: 'opt1',
    },
    {
      label: 'opt 2',
      value: 'opt2',
      children: [{
        label: 'opt 2 1',
        value: 'opt21',
      }],
    },
    {
      label: 'opt 3',
      value: 'opt3',
    }];

    expect(getInitialFilters(withChildren)).toBeTruthy();
  });
});
