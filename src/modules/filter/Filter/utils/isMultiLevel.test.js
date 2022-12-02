import isMultiLevel from './isMultiLevel';

describe('isMultiLevel', () => {
  it('returns false if options have no children', () => {
    const withoutChildren = [
      { label: 'opt 1', value: 'opt1' },
      { label: 'opt 2', value: 'opt2' },
      { label: 'opt 3', value: 'opt3' },
    ];

    expect(isMultiLevel(withoutChildren)).toBeFalsy();
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

    expect(isMultiLevel(withChildren)).toBeTruthy();
  });
});
