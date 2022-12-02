import filterOptions from './filterOptions';

describe('filterOptions', () => {
  it('filters options', () => {
    const options = [
      { label: 'Clothing', value: 'housing', initial: false },
      { label: 'Education', value: 'education', initial: false },
      { label: 'Employment', value: 'employment', initial: false },
      { label: 'Dylan Likes All Caps', value: 'fun', initial: false },
    ];

    const expected = [
      { label: 'Clothing', value: 'housing', initial: false },
      { label: 'Employment', value: 'employment', initial: false },
    ];

    const result = filterOptions(options, 'lo');
    expect(result).toEqual(expected);
  });

  it('filters multi level options', () => {
    const options = [
      { label: 'opt 1', value: 'opt1' },
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

    const result1 = filterOptions(options, 'opt 3');
    const expected1 = [{ label: 'opt 3', value: 'opt3' }];
    expect(result1).toEqual(expected1);

    const result2 = filterOptions(options, 'opt 2-2-1');
    const expected2 = [
      {
        label: 'opt 2',
        value: 'opt2',
        children: [
          {
            label: 'opt 2-2',
            value: 'opt22',
            children: [{ label: 'opt 2-2-1', value: 'opt221' }],
          },
        ],
      },
    ];
    expect(result2).toEqual(expected2);
  });
});
