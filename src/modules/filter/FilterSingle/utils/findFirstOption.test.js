import findFirstOption from './findFirstOption';

describe('findFirstOption', () => {
  it('returns the first object that does not have children from an array of nested filter options ', () => {
    const options = [
      {
        label: 'opt 2',
        value: 'opt2',
        children: [
          { label: 'opt 2-1', value: 'opt21' },
          {
            label: 'opt 2-2',
            value: 'opt22',
            children: [{ label: 'opt 2-2-1', value: 'opt221' }],
          },
        ],
      },
      { label: 'opt 3', value: 'opt3' },
    ];

    const expected = { label: 'opt 2-1', value: 'opt21' };

    expect(findFirstOption(options)).toEqual(expected);
  });
});
