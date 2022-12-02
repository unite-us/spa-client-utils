import countOptions from './countOptions';

describe('countOptions', () => {
  it('returns count of all options if options have no children', () => {
    const withoutChildren = [
      { label: 'opt 1', value: 'opt1' },
      { label: 'opt 2', value: 'opt2' },
      { label: 'opt 3', value: 'opt3' },
    ];

    expect(countOptions(withoutChildren)).toBe(3);
  });

  it('returns count of options, excluding group headers, if options have children', () => {
    const withChildren = [
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

    expect(countOptions(withChildren)).toBe(4);
  });
});
